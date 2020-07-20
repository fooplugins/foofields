<?php

namespace FooPlugins\FooFields\Admin\Metaboxes;

use WP_User;

if ( ! class_exists( 'FooPlugins\FooFields\Admin\Metaboxes\CustomPostTypeMetaboxFieldGroup' ) ) {

	abstract class CustomPostTypeMetaboxFieldGroup extends CustomPostTypeMetabox {

		private $field_group;

		function __construct( $metabox, $field_group ) {
			$this->field_group = $field_group;
			$metabox['metabox_render_function'] = array( $this, 'render_metabox' );

			parent::__construct( $metabox );

			$hook = $this->metabox_hook_prefix();

			add_action( $hook . 'Render', array( $this, 'render_field_group_metabox' ), 10, 1 );

			//save field group post data
			add_action( $hook . 'Save', array( $this, 'save_field_group_data' ) );

			//enqueue assets needed for field groups
			add_action( $hook . 'EnqueueAssets', array( $this, 'enqueue_field_group_assets' ) );

			new namespace\Fields\AjaxButton( $this, 'ajaxbutton' );
			new namespace\Fields\Selectize( $this, 'selectize' );
			new namespace\Fields\SelectizeMulti( $this, 'selectize-multi' );
			new namespace\Fields\Suggest( $this, 'suggest' );
			new namespace\Fields\EmbedMetabox( $this, 'embed-metabox' );
			new namespace\Fields\Repeater( $this, 'repeater' );
		}

		/**
		 * Finds all fields all fields of a certain type recursively
		 * @param $field_type
		 * @param bool $field_group
		 *
		 * @return array
		 */
		function find_all_fields_by_type( $field_type, $field_group = false ) {
			if ( false === $field_group ) {
				$field_group = $this->field_group;
			}

			$found = array();

			if ( isset( $field_group['tabs'] ) ) {
				foreach ( $field_group['tabs'] as $tab ) {
					$found = array_merge( $found, $this->find_all_fields_by_type( $field_type, $tab ) );
				}
			}

			if ( isset( $field_group['fields'] ) ) {
				foreach ( $field_group['fields'] as $field ) {
					if ( $field['type'] === $field_type ) {
						$found[] = $field;
					}
				}
			}

			return $found;
		}

		/**
		 * Returns the ID of the field
		 *
		 * @param array $field
		 *
		 * @return string
		 */
		function build_field_id( $field ) {
			$id = $this->metabox_id();

			return "foofields_{$id}_{$field['id']}";
		}

		/**
		 * Render the metabox contents
		 *
		 * @param $post
		 */
		public function render_field_group_metabox( $post ) {
			$full_id = $this->metabox_id();

			$state = array();

			if ( isset( $this->metabox['meta_key'] ) ) {
				//get the state from the post meta
				$state = get_post_meta( $post->ID, $this->metabox['meta_key'], true );
			} else {
				if ( isset( $this->metabox['surpress_metakey_error'] ) && $this->metabox['surpress_metakey_error'] ) {
					//suppress the error message for the missing meta_key
				} else {
					$error_field = array(
						'id' => $full_id . '_errors',
						'type' => 'error',
						'desc' => __( 'WARNING : There is no "meta_key" value set for the metabox, which means nothing will be saved! If this is intentional, then set "surpress_metakey_error" to true.', $this->metabox['text_domain'] )
					);
					if ( !isset( $this->field_group['fields'] ) ) {
						$this->field_group['fields'] = array( $error_field );
					} else {
						$this->field_group['fields'] = array_merge( array( $error_field ), $this->field_group['fields'] );
					}
				}
			}

			$state = $this->apply_filters( 'RenderState', $state, $post );

			//render the tab field group
			FieldRenderer::render_field_group( $this->field_group, $full_id, $state );
		}

		/**
		 * Save all the data in the field group
		 *
		 * @param $post_id
		 *
		 * @return mixed
		 */
		public function save_field_group_data( $post_id ) {

			//build up the state
			$state = $this->get_posted_data( $post_id );

			$this->do_action( 'BeforeSaveFieldGroupData', $post_id, $state );

			if ( isset( $this->metabox['meta_key'] ) ) {
				update_post_meta( $post_id, $this->metabox['meta_key'], $state );
			}

			$this->do_action( 'AfterSaveFieldGroupData', $post_id, $state );
		}

		/**
		 * Get the sanitized posted data for the metabox
		 *
		 * @param $post_id
		 *
		 * @return mixed|void
		 */
		private function get_posted_data( $post_id ) {
			$full_id = $this->metabox_id();

			$sanitized_data = $this->safe_get_from_request( $full_id, array(), false );

			$data = $this->get_posted_data_recursive( $this->field_group , $sanitized_data );

			$data = $this->apply_filters( 'GetPostedData', $data, $this, $post_id );

			return $data;
		}

		/**
		 * Recursively extract data from a sanitized data source
		 *
		 * @param $source
		 * @param $sanitized_data
		 *
		 * @return array
		 */
		function get_posted_data_recursive( $source, $sanitized_data ) {
			$data = array();

			//first, check if we have fields
			if ( isset( $source['fields'] ) ) {
				foreach ( $source['fields'] as $field ) {
					if ( ! array_key_exists( $field['id'], $sanitized_data ) ) {
						//the field had no posted value, check for a default
						if ( isset( $field['default'] ) ) {
							$data[ $field['id'] ] = $field['default'];
						}
					} else {
						$value = $sanitized_data[ $field['id'] ];

						$type = sanitize_title( isset( $field['type'] ) ? $field['type'] : 'text' );



						//textareas need some special attention
						if ( 'textarea' === $type ) {
							$value = $this->sanitize_textarea( $value );
						} else {
							$value = $this->clean( $value );

							$value = $this->apply_filters( 'GetPostedDataByType\\' . $type, $value );
						}

						//we have no value set, so check required
						if ( empty( $value) ) {
							if ( isset( $field['required'] ) && $field['required'] ) {
								$data = $this->set_field_error( $data, $field, sprintf( __('%s is required!'), $field['label'] ) );
							}
						}

						$data[ $field['id'] ] = $value;
					}
				}
			}

			//then check if we have tabs and loop through the tabs
			if ( isset( $source['tabs'] ) ) {
				foreach ( $source['tabs'] as $tab ) {
					$tab_data = $this->get_posted_data_recursive( $tab, $sanitized_data );
					$data = array_merge_recursive( $data, $tab_data );
				}
			}

			return $data;
		}

		function set_field_error( $data, $field, $error ) {
			if ( !isset( $data[ '__errors' ] ) ) {
				$data[ '__errors' ] = array();
			}
			$data[ '__errors' ][ $field['id'] ] = array(
				'message' => $error
			);

			return $data;
		}

		/***
		 * Enqueue the assets needed by the field groups
		 */
		function enqueue_field_group_assets() {
			wp_enqueue_script( 'selectize', $this->metabox['plugin_url'] . 'assets/vendor/selectize/selectize.min.js', array('jquery'), $this->metabox['plugin_version'] );
			wp_enqueue_script( 'foometafields', $this->metabox['plugin_url'] . 'assets/vendor/foofields/foofields.js', array(
				'jquery',
				'suggest',
				'wp-color-picker',
				'selectize'
			), $this->metabox['plugin_version'] );

			wp_enqueue_style( 'selectize', $this->metabox['plugin_url'] . 'assets/vendor/selectize/selectize.css', array(), $this->metabox['plugin_version'] );
			wp_enqueue_style( 'foometafields', $this->metabox['plugin_url'] . 'assets/vendor/foofields/foofields.min.css', array(
				'wp-color-picker',
				'selectize'
			), $this->metabox['plugin_version'] );
		}
	}
}
