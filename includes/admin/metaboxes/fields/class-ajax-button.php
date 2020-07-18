<?php

namespace FooPlugins\FooFields\Admin\Metaboxes\Fields;

if ( ! class_exists( 'FooPlugins\FooFields\Admin\Metaboxes\Fields\AjaxButton' ) ) {

	class AjaxButton extends Field {

		function __construct( $metabox_field_group ) {
			parent::__construct( $metabox_field_group );

			//handle ajaxbutton field callbacks
			add_action( 'wp_ajax_foofields_ajaxbutton', array( $this, 'ajax_handle_ajaxbutton' ) );
		}

		/**
		 * Ajax handler for ajaxbutton fields
		 */
		function ajax_handle_ajaxbutton() {
			$field = $this->find_field_for_ajax_handler_based_on_nonce( 'ajaxbutton' );
			if ( $field !== false ) {
				$action = $this->build_field_id( $field );
				$this->metabox_field_group->do_action( 'AjaxButton\\' . $action, $field );

				if ( isset( $field['callback'] ) ) {
					if ( is_callable( $field['callback'] ) ) {
						call_user_func( $field['callback'], $field );
					}
				}
			}
		}
	}
}
