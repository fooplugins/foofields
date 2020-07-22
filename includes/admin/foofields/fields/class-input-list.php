<?php

namespace FooPlugins\FooFields\Admin\FooFields\Fields;

use FooPlugins\FooFields\Admin\FooFields\Container;

if ( ! class_exists( __NAMESPACE__ . '\InputList' ) ) {

	class InputList extends Field {

		protected $list_type = 'radio';

		/**
		 * Field constructor.
		 *
		 * @param $container Container
		 * @param $type string
		 * @param $field_config array
		 */
		function __construct( $container, $type, $field_config ) {
			parent::__construct( $container, $type, $field_config );

			if ( isset( $field_config['list-type'] ) ) {
				$this->list_type = $field_config['list-type'];
			}

			if ( 'checkboxlist' === $this->type ) {
				$this->list_type = 'checkbox';
			}
		}

		function render_input( $override_attributes = false ) {
			$i      = 0;
			foreach ( $this->config['choices'] as $value => $item ) {
				$label_attributes = array();
				$inner = null;
				if ( is_array( $item ) ) {
					$inner = $item['label'];
					if ( isset( $item['tooltip'] ) ) {
						$label_attributes = array_merge( $label_attributes, $this->get_tooltip_attributes( $item['tooltip'] ) );
					}
					if ( isset( $item['html'] ) ) {
						$inner = wp_kses_post( $item['html'] );
					}
				} else {
					$inner = '<span>' . esc_html( $item ) . '</span>';
				}
				$input_attributes = array(
					'name' => $this->name,
					'id' => $this->unique_id . $i,
					'type' => $this->list_type,
					'value' => $value,
					'tabindex' => $i
				);

				$field_value = $this->value();

				if ( $this->list_type !== 'radio' ) {
					$input_attributes['name'] = $this->name . '[' . $value . ']';

					if ( isset( $field_value ) && isset( $field_value[$value] ) ) {
						$input_attributes['checked'] = 'checked';
					}
				} else {
					if ( $field_value === $value ) {
						$input_attributes['checked'] = 'checked';
					}
				}
				self::render_html_tag( 'label', $label_attributes, null, false );
				self::render_html_tag( 'input', $input_attributes );
				echo $inner;
				echo '</label>';
				$i ++;
			}
		}
	}
}
