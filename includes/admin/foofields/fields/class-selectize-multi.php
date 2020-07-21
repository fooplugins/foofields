<?php

namespace FooPlugins\FooFields\Admin\FooFields\Fields;

if ( ! class_exists( __NAMESPACE__ . '\SelectizeMulti' ) ) {

	class SelectizeMulti extends Field {

		function __construct( $container, $type, $field_config ) {
			parent::__construct( $container, $type, $field_config );

			$hook = $this->container->container_hook_prefix();

			//save taxonomy mappings for selectize-multi fields
			add_action( $hook . 'AfterSavePostMeta', array( $this, 'save_taxonomy_mapping' ), 10, 2 );

			//handle ajax selectize multiple add
			add_action( 'wp_ajax_foofields_selectize_multi_add_' . $this->unique_id . '-field', array( $this, 'ajax_handle_selectize_multi_add' ) );
		}

		/**
		 * Render the selectize multi field
		 *
		 * @param $optional_attributes
		 */
		function render( $override_attributes = false ) {
			global $post;
			$inner = '';

			$field_value = $this->value();

			$selected_values = is_array( $field_value ) ? $field_value : array();

			if ( isset( $this->config['binding'] ) &&
			     isset( $this->config['binding']['type'] ) &&
			     $this->config['binding']['type'] === 'taxonomy' &&
			     isset( $this->config['binding']['taxonomy'] ) ) {

				$taxonomy = $this->config['binding']['taxonomy'];

				$terms = get_terms( array(
					'taxonomy' => $taxonomy,
					'hide_empty' => false,
				) );

				$this->config['choices'] = array();

				foreach ( $terms as $term ) {
					$this->config['choices'][] = array(
						'value' => $term->term_id,
						'display' => $term->name
					);
				}

				//get related terms for the current post (if there is one)
				if ( isset( $post ) &&
				     count( $selected_values ) === 0 &&
				     isset( $this->config['binding']['sync_with_post'] ) &&
				     $this->config['binding']['sync_with_post'] ) {

					$related_terms = get_the_terms( $post, $taxonomy );

					if ( $related_terms !== false && !is_wp_error( $related_terms ) ) {
						$selected_values = wp_list_pluck( $related_terms, 'term_id' );
					}
				}
			}

			//build up options
			if ( isset( $this->config['choices'] ) ) {
				foreach ( $this->config['choices'] as $choice ) {
					$selected = in_array( $choice['value'], $selected_values ) ? ' selected="selected"' : '';
					$inner .= '<option value="' . esc_attr( $choice['value'] ) . '"' . $selected . '>' . esc_html( $choice['display'] ) . '</option>';
				}
			}

			$selectize_options = array(
				'items' => $selected_values,
				'closeAfterSelect' => isset( $this->config['close_after_select'] ) ? $this->config['close_after_select'] : true
			);

			if ( isset( $this->config['max_items'] ) ) {
				$selectize_options['maxItems'] = $this->config['max_items'];
			}

			self::render_html_tag( 'select', array(
				'id'          => $this->unique_id,
				'name'        => $this->name . '[]',
				'placeholder' => $this->config['placeholder'],
				'data-action' => 'foofields_selectize_multi_add',
				'data-nonce'  => wp_create_nonce( $this->unique_id ),
				'data-create' => isset( $this->config['create'] ) ? $this->config['create'] : false,
				'data-selectize'  => json_encode( $selectize_options )
			), $inner, true, false );
		}

		/**
		 * Save the taxonomy mappings for the post
		 *
		 * @param $post_id
		 * @param $state
		 */
		function save_taxonomy_mapping( $post_id, $state ) {
			if ( isset( $this->config['binding'] ) &&
			     isset( $this->config['binding']['type'] ) &&
			     $this->config['binding']['type'] === 'taxonomy' &&
			     isset( $this->config['binding']['taxonomy'] ) &&
			     isset( $this->config['binding']['sync_with_post'] ) &&
			     $this->config['binding']['sync_with_post'] ) {

				$taxonomy = $this->config['binding']['taxonomy'];

				$value = isset( $state[ $this->config['id'] ] ) ? $state[ $this->config['id'] ] : null;

				if ( empty( $value ) ) {

					//remove all relationships between the object and any terms in a particular taxonomy
					wp_delete_object_term_relationships( $post_id, $taxonomy );

				} else {
					$result = wp_set_object_terms( $post_id, array_map('intval', $value ), $taxonomy, false );

					if ( is_wp_error( $result ) ) {
						//$state = $this->metabox_field_group->set_field_error( $state, $this->config, sprintf( __('Could not save mappings for taxonomy : %s' ), $taxonomy ) );
						//TODO : the above just sets the error, we need to save the error state back to the post_meta
					}
				}
			}
		}

		/**
		 * Ajax handler for Selectize Multi fields add
		 */
		function ajax_handle_selectize_multi_add() {
			if ( $this->verify_nonce() ) {

				$thing_to_add = $this->sanitize_text( 'add' );

				if ( !empty( $thing_to_add ) ) {

					if ( isset( $this->config['callback'] ) ) {
						if ( is_callable( $this->config['callback'] ) ) {
							call_user_func( $this->config['callback'], $this );
						}
					}

					if ( isset( $this->config['binding'] ) &&
					     isset( $this->config['binding']['type'] ) &&
					     $this->config['binding']['type'] === 'taxonomy' &&
					     isset( $this->config['binding']['taxonomy'] ) ) {

						$taxonomy = $this->config['binding']['taxonomy'];

						$new_term = wp_insert_term( $thing_to_add, $taxonomy );

						if ( ! is_wp_error( $new_term ) ) {

							wp_send_json( array(
								'new' => array(
									'value'   => $new_term['term_id'],
									'display' => $thing_to_add
								)
							) );
						}
					}
				}
			}

			die();
		}
	}
}
