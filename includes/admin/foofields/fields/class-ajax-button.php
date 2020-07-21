<?php
namespace FooPlugins\FooFields\Admin\FooFields\Fields;

if ( ! class_exists( __NAMESPACE__ . '\AjaxButton' ) ) {

	class AjaxButton extends Field {

		function __construct( $container, $type, $field_config ) {
			parent::__construct( $container, $type, $field_config );

			//handle ajaxbutton field callbacks
			add_action( 'wp_ajax_foofields_ajaxbutton_' . $this->unique_id . '-field', array( $this, 'ajax_handle_ajaxbutton' ) );
		}

		/**
		 * Render the ajax button field
		 */
		function render_input( $override_attributes = false ) {

			$button_text = isset( $this->config['button'] ) ? $this->config['button'] : __( 'Run', $this->container->config['text_domain'] );

			$attributes = array(
				'id'         => $this->unique_id,
				'class'      => isset( $this->config['button_class'] ) ? $this->config['button_class'] : 'button button-primary button-large',
				'href'       => '#' . $this->unique_id,
				'data-nonce' => wp_create_nonce( $this->unique_id )
			);

			$value = $this->value();
			if ( isset( $value ) ) {
				$attributes['data-value'] = $value;
			}

			self::render_html_tag( 'a', $attributes, $button_text );

			self::render_html_tag( 'span', array( 'class' => 'spinner' ) );

			self::render_html_tag( 'span', array( 'class' => 'response-message' ) );
		}

		/**
		 * Ajax handler for ajaxbutton fields
		 */
		function ajax_handle_ajaxbutton() {
			if ( $this->verify_nonce() ) {
				$action = $this->container->container_id() . '_' . $this->config['id'];
				$this->container->do_action( 'AjaxButton\\' . $action, $this );

				if ( isset( $this->config['callback'] ) ) {
					if ( is_callable( $this->config['callback'] ) ) {
						call_user_func( $this->config['callback'], $this );
					}
				}
			}
		}
	}
}
