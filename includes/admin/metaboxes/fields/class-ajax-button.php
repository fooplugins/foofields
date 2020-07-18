<?php
namespace FooPlugins\FooFields\Admin\Metaboxes\Fields;

use FooPlugins\FooFields\Admin\Metaboxes\FieldRenderer;

if ( ! class_exists( 'FooPlugins\FooFields\Admin\Metaboxes\Fields\AjaxButton' ) ) {

	class AjaxButton extends Field {

		function __construct( $metabox_field_group, $field_type ) {
			parent::__construct( $metabox_field_group, $field_type );

			//handle ajaxbutton field callbacks
			add_action( 'wp_ajax_foofields_ajaxbutton', array( $this, 'ajax_handle_ajaxbutton' ) );
		}

		/**
		 * Render the ajax button field
		 *
		 * @param $field
		 * @param $attributes
		 */
		function render( $field, $attributes ) {

			$button_text = isset( $field['button'] ) ? $field['button'] : __( 'Run' );

			$attributes = array(
				'id'         => $field['input_id'],
				'class'      => isset( $field['class'] ) ? $field['class'] : 'button button-primary button-large',
				'href'       => '#' . $field['input_id'],
				'data-nonce' => wp_create_nonce( $field['input_id'] )
			);

			if ( isset( $field['value'] ) ) {
				$attributes['data-value'] = $field['value'];
			}

			FieldRenderer::render_html_tag( 'a', $attributes, $button_text );

			FieldRenderer::render_html_tag( 'span', array( 'class' => 'spinner' ) );

			FieldRenderer::render_html_tag( 'span', array( 'class' => 'response-message' ) );
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
