<?php

namespace FooPlugins\FooFields\Admin\Metaboxes\Fields;

use FooPlugins\FooFields\Admin\Metaboxes\CustomPostTypeMetaboxFieldGroup;

if ( ! class_exists( 'FooPlugins\FooFields\Admin\Metaboxes\Fields\Field' ) ) {

	abstract class Field {

		/**
		 * @var CustomPostTypeMetaboxFieldGroup
		 */
		protected $metabox_field_group;

		function __construct( $metabox_field_group ) {
			$this->metabox_field_group = $metabox_field_group;
		}

		/**
		 * Find the field for the current ajax callback by verifying the nonce
		 *
		 * @param $field_type
		 *
		 * @return bool|mixed
		 */
		protected function find_field_for_ajax_handler_based_on_nonce( $field_type ) {
			$nonce = $this->sanitize_key( 'nonce' );

			if ( null !== $nonce ) {
				$fields = $this->find_all_fields_by_type( $field_type );

				foreach ( $fields as $field ) {
					$action = $this->build_field_id( $field );
					if ( wp_verify_nonce( $nonce, $action ) ) {
						return $field;
					}
				}
			}
			return false;
		}

		/**
		 * Return a sanitized and unslashed key from $_REQUEST
		 *
		 * @param $key
		 *
		 * @return string|null
		 */
		protected function sanitize_key( $key ) {
			return $this->metabox_field_group->sanitize_key( $key );
		}

		/**
		 * Finds all fields all fields of a certain type recursively
		 * @param $field_type
		 * @param bool $field_group
		 *
		 * @return array
		 */
		protected function find_all_fields_by_type( $field_type, $field_group = false ) {
			return $this->metabox_field_group->find_all_fields_by_type( $field_type, $field_group );
		}

		/**
		 * Returns the ID of the field
		 *
		 * @param array $field
		 *
		 * @return string
		 */
		protected function build_field_id( $field ) {
			return $this->metabox_field_group->build_field_id( $field );
		}

		/**
		 * Safe way to get value from the request object
		 *
		 * @param $key
		 * @param null $default
		 * @param bool $clean
		 *
		 * @return mixed
		 */
		protected function safe_get_from_request( $key, $default = null, $clean = true ) {
			return $this->metabox_field_group->safe_get_from_request( $key, $default, $clean );


		}

		/**
		 * Return a sanitized and unslashed value from $_REQUEST
		 * @param $key
		 *
		 * @return string|null
		 */
		protected function sanitize_text( $key ) {
			return $this->metabox_field_group->sanitize_text( $key );
		}
	}
}
