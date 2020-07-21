<?php

namespace FooPlugins\FooFields\Admin\Metaboxes;

if ( ! class_exists( 'FooPlugins\FooFields\Admin\Metaboxes\FieldRenderer' ) ) {

	class FieldRenderer {



		/**
		 * Process the fields based on the state
		 *
		 * @param $parent_array
		 * @param $state
		 * @param string $tab_id
		 */
		static function process_field_group( &$parent_array, $state, $tab_id = 'no_tab' ) {
			if ( isset( $parent_array['tabs'] ) ) {
				foreach ( $parent_array['tabs'] as &$tab ) {
					self::process_field_group( $tab, $state, $tab['id'] );
				}
			}

			if ( isset( $parent_array['fields'] ) ) {
				$errors = self::process_errors( $parent_array['fields'], $state, $tab_id );

				if ( $errors > 0 ) {
					$parent_array['errors'] = $errors;
				}
			}
		}

		/**
		 * Process the array of fields for errors
		 *
		 * @param $fields
		 * @param $state
		 * @param $tab_id
		 *
		 * @return int
		 */
		static function process_errors( &$fields, $state, $tab_id ) {
			//check if there are any errors
			if ( isset( $state['__errors'] ) ) {
				$errors = array();

				foreach ( $fields as $field ) {
					if ( array_key_exists( $field['id'], $state['__errors'] ) ) {
						$errors[] = esc_html( $state['__errors'][$field['id']]['message'] );
						$field['error'] = true;
					}
				}

				if ( count( $errors ) > 0 ) {
					$error_message = '<strong>' . esc_html( __( 'The following errors were found:' ) ) . '</strong><br />';
					$error_message .= implode( '<br />', $errors );

					$error_field = array(
							'id' => $tab_id . '_errors',
							'type' => 'error',
							'desc' => $error_message
					);

					array_unshift($fields, $error_field );

					return count( $errors );
				}
			}
			return 0;
		}






	}
}
