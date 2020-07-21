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
			$spacer = isset( $this->config['spacer'] ) ? $this->config['spacer'] : '<div class="foofields-spacer"></div>';
			foreach ( $this->config['choices'] as $value => $item ) {
				$label_attributes = array(
					'for' => $this->unique_id . $i
				);
				$encode = true;
				if ( is_array( $item ) ) {
					$label = $item['label'];
					if ( isset( $item['tooltip'] ) ) {
						$label_attributes['data-balloon'] = $item['tooltip'];
						$label_attributes['data-balloon-length'] = isset( $item['tooltip-length'] ) ? $item['tooltip-length'] : 'small';
						$label_attributes['data-balloon-pos'] = isset( $item['tooltip-position'] ) ? $item['tooltip-position'] : 'down';
					}
					if ( isset( $item['html'] ) ) {
						$label = wp_kses_post( $item['html'] );
						$encode = false;
					}
				} else {
					$label = $item;
				}
				$input_attributes = array(
					'name' => $this->name,
					'id' => $this->unique_id . $i,
					'type' => $this->list_type,
					'value' => $value,
					'tabindex' => $i
				);

				if ( $this->type === 'htmllist' ) {
					$input_attributes['style'] = 'display:none';
				}

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

				self::render_html_tag( 'input', $input_attributes );
				self::render_html_tag( 'label', $label_attributes, $label, true, $encode );
				if ( $i < count( $this->config['choices'] ) - 1 ) {
					echo $spacer;
				}
				$i ++;
			}
		}
	}
}
