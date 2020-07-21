<?php

namespace FooPlugins\FooFields\Admin\FooFields\Fields;

if ( ! class_exists( __NAMESPACE__ . '\Textarea' ) ) {

	class Textarea extends Field {

		function render_input( $override_attributes = false ) {
			$attributes = array(
				'id' => $this->unique_id,
				'name' => $this->name
			);

			if ( isset( $this->config['placeholder'] ) ) {
				$attributes['placeholder'] = $this->config['placeholder'];
			}
			self::render_html_tag( 'textarea', $attributes, esc_textarea( $this->value() ), true, false );
		}

		function process_posted_value( $unsanitized_value ) {
			return $this->sanitize_textarea( $unsanitized_value );
		}
	}
}
