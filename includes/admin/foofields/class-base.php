<?php
/**
 * An abstract base class that houses common functions
 */

namespace FooPlugins\FooFields\Admin\FooFields;

if ( ! class_exists( __NAMESPACE__ . '\Base' ) ) {

	abstract class Base {

		/**
		 * Sanitize variables using sanitize_text_field. Arrays are sanitized recursively.
		 * Non-scalar values are ignored.
		 *
		 * @param string|array $var Data to sanitize.
		 *
		 * @return string|array
		 */
		protected function sanitize( $var ) {
			if ( !isset( $var ) ) {
				return $var;
			} else if ( is_array( $var ) ) {
				return array_map( array( $this, 'sanitize' ), $var );
			} else {
				return is_scalar( $var ) ? sanitize_text_field( $var ) : $var;
			}
		}

		/**
		 * Run sanitize over posted textarea but maintain line breaks.
		 *
		 * @param string $var Data to sanitize.
		 *
		 * @return string
		 */
		protected function sanitize_textarea( $var ) {
			return implode( "\n", array_map( array( $this, 'sanitize' ), explode( "\n", $var ) ) );
		}

		/**
		 * Safely renders an HTML tag
		 *
		 * @param $tag
		 * @param $attributes
		 * @param string $inner
		 * @param bool $close
		 * @param bool $escape_inner
		 */
		static function render_html_tag( $tag, $attributes, $inner = null, $close = true, $escape_inner = true ) {
			echo '<' . $tag . ' ';
			//make sure all attributes are escaped
			$attributes     = array_map( 'esc_attr', $attributes );
			$attributePairs = [];
			foreach ( $attributes as $key => $val ) {
				if ( is_null( $val ) ) {
					continue;
				} else if ( is_int( $key ) ) {
					$attributePairs[] = esc_attr( $val );
				} else {
					$val              = esc_attr( $val );
					$attributePairs[] = "{$key}=\"{$val}\"";
				}
			}
			echo implode( ' ', $attributePairs );

			if ( in_array( $tag, array( 'img', 'input', 'br', 'hr', 'meta', 'etc' ) ) ) {
				echo ' />';
				return;
			}
			echo '>';
			if ( isset( $inner ) ) {
				if ( $escape_inner ) {
					echo esc_html( $inner );
				} else {
					echo $inner;
				}
			}
			if ( $close ) {
				echo '</' . $tag . '>';
			}
		}
	}
}
