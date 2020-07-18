<?php

namespace FooPlugins\FooFields\Admin\Metaboxes\Fields;

if ( ! class_exists( 'FooPlugins\FooFields\Admin\Metaboxes\Fields\SelectizeMulti' ) ) {

	class SelectizeMulti extends Field {

		function __construct( $metabox_field_group ) {
			parent::__construct( $metabox_field_group );

			$hook = $this->metabox_field_group->metabox_hook_prefix();

			//save taxonomy mappings for selectize-multi fields
			add_action( $hook . 'AfterSaveFieldGroupData', array( $this, 'save_taxonomy_mapping' ), 10, 2 );

			//handle ajax selectize multiple add
			add_action( 'wp_ajax_foofields_selectize_multi_add', array( $this, 'ajax_handle_selectize_multi_add' ) );
		}

		/**
		 * Save the taxonomy mappings for the post
		 *
		 * @param $post_id
		 * @param $state
		 */
		function save_taxonomy_mapping( $post_id, $state ) {
			$fields = $this->find_all_fields_by_type( 'selectize-multi' );

			foreach ( $fields as $field ) {
				if ( isset( $field['binding'] ) &&
				     isset( $field['binding']['type'] ) &&
				     $field['binding']['type'] === 'taxonomy' &&
				     isset( $field['binding']['taxonomy'] ) &&
					 isset( $field['binding']['sync_with_post'] ) &&
				     $field['binding']['sync_with_post'] ) {

					$taxonomy = $field['binding']['taxonomy'];

					$value = isset( $state[ $field['id'] ] ) ? $state[ $field['id'] ] : null;

					if ( empty( $value ) ) {

						//remove all relationships between the object and any terms in a particular taxonomy
						wp_delete_object_term_relationships( $post_id, $taxonomy );

					} else {
						$result = wp_set_object_terms( $post_id, array_map('intval', $value ), $taxonomy, false );

						if ( is_wp_error( $result ) ) {
							$state = $this->metabox_field_group->set_field_error( $state, $field, sprintf( __('Could not save mappings for taxonomy : %s' ), $taxonomy ) );
							//TODO : the above just sets the error, we need to save the error state back to the post_meta
						}
					}
				}
			}
		}

		/**
		 * Ajax handler for Selectize Multi fields add
		 */
		function ajax_handle_selectize_multi_add() {
			$field = $this->find_field_for_ajax_handler_based_on_nonce( 'selectize-multi' );
			if ( $field !== false ) {
				$action = $this->build_field_id( $field );
				$thing_to_add = $this->sanitize_text( 'add' );

				if ( !empty( $thing_to_add ) ) {
					$this->metabox_field_group->do_action( 'SelectizeMultiAdd\\' . $action, $thing_to_add, $field );

					if ( isset( $field['callback'] ) ) {
						if ( is_callable( $field['callback'] ) ) {
							call_user_func( $field['callback'], $field );
						}
					}

					if ( isset( $field['binding'] ) &&
					     isset( $field['binding']['type'] ) &&
					     $field['binding']['type'] === 'taxonomy' &&
					     isset( $field['binding']['taxonomy'] ) ) {

						$taxonomy = $field['binding']['taxonomy'];

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
