<?php

namespace FooPlugins\FooFields\Admin\FooFields\Fields;

use FooPlugins\FooFields\Admin\FooFields\Base;
use FooPlugins\FooFields\Admin\FooFields\Container;

if ( ! class_exists( __NAMESPACE__ . '\Field' ) ) {

	class Field extends Base {

		/**
		 * The container object that will house the field
		 * @var Container
		 */
		protected $container;

		/**
		 * The field type
		 * @var string
		 */
		protected $type;

		/**
		 * An array of the field config / options
		 * @var array
		 */
		protected $config;

		/**
		 * An internal id for the field
		 * @var string
		 */
		protected $id;

		/**
		 * A unique identifier for the field within a container
		 * @var string
		 */
		protected $unique_id;

		/**
		 * The field input name
		 * @var string
		 */
		protected $name;

		/**
		 * The field layout
		 * @var string
		 */
		protected $layout;

		/**
		 * The field classes
		 * @var string
		 */
		protected $classes;

		public $error = false;

		protected $label;

		protected $description;

		protected $required;

		protected $tooltip;

		protected $choices;

		protected $default;

		protected $placeholder;

		public $override_value_function;

		/**
		 * The parent_id for the current field, usually the id of the tab
		 *
		 * @var null
		 */
		public $parent_id = null;

		/**
		 * Field constructor.
		 *
		 * @param $container Container
		 * @param $type string
		 * @param $field_config array
		 */
		function __construct( $container, $type, $field_config ) {
			$this->container = $container;
			$this->type = $type;
			$this->config = $field_config;

			$this->id          = $field_config['id'];
			$this->unique_id   = $container->get_unique_id( $field_config );
			$this->name        = $container->get_field_name( $field_config );
			$this->layout      = isset( $field_config['layout'] ) ? $field_config['layout'] : 'inline';
			$this->label       = isset( $field_config['label'] ) ? $field_config['label'] : null;
			$this->description = isset( $field_config['desc'] ) ? $field_config['desc'] : null;
			$this->required    = isset( $field_config['required'] ) ? $field_config['required'] : null;
			$this->tooltip     = isset( $field_config['tooltip'] ) ? $field_config['tooltip'] : null;
			$this->choices     = isset( $field_config['choices'] ) ? $field_config['choices'] : array();
			$this->default     = isset( $field_config['default'] ) ? $field_config['default'] : null;
			$this->placeholder = isset( $field_config['placeholder'] ) ? $field_config['placeholder'] : null;

			$this->classes[] = 'foofields-field';
			if ( isset( $field_config['class'] ) ) {
				$this->classes[] = $field_config['class'];
			}
		}

		/**
		 * Returns the data attributes for the field
		 *
		 * @return array|mixed
		 */
		function data_attributes() {
			if ( isset( $this->config['data'] ) && is_array( $this->config['data'] ) ) {
				return $this->config['data'];
			}

			return array();
		}

		/**
		 * Makes any changes we need for a field before a field is rendered
		 */
		function pre_render() {
			//check if there were any processing errors
			$this->get_error_from_state();

			if ( $this->error !== false ) {
				$this->classes[] = 'foofields-error';
			}

			$this->classes[] = "foofields-type-{$this->type}";
			$this->classes[] = "foofields-layout-{$this->layout}";

			if ( !$this->visible() ) {
				$this->classes[] = 'foofields-hidden';
			}
		}

		/**
		 * function for rendering the entire field
		 *
		 * @param bool $render_label
		 * @param bool $override_attributes
		 */
		function render( $render_label = true, $override_attributes = false ) {
			$field_attributes = array(
				'id' => $this->unique_id . '-field',
				'class' => implode( ' ', $this->classes )
			);
			$data_attributes = $this->data_attributes();

			if ( count( $data_attributes ) > 0 ) {
				$field_attributes = array_merge( $field_attributes, $this->container->process_data_attributes( $data_attributes ) );
			}

			self::render_html_tag('div', $field_attributes, null, false );

			if ( $render_label ) {
				$this->render_label();
			}
			$this->render_input_container( $override_attributes );

			echo '</div>';
		}

		/**
		 * Render a field label
		 */
		function render_label() {
			if ( isset( $this->label ) ) {
				echo '<div class="foofields-label">';
				$label = $this->label;
				if ( isset( $this->required ) && $this->required === true ) {
					$label .= ' *';
				}
				self::render_html_tag( 'label', array( 'for' => $this->unique_id ), $label );
				$this->render_tooltip();
				echo '</div>';
			}
		}

		/**
		 * Render a tooltip
		 */
		function render_tooltip() {
			if ( isset( $this->tooltip ) ) {
				$icon = 'dashicons-editor-help';
				$tooltip_attributes = $this->get_tooltip_attributes( $this->tooltip, 'right', 'large' );
				if ( is_array( $this->tooltip ) ) {
					if ( isset( $this->tooltip['icon'] ) ) {
						$icon = $this->tooltip['icon'];
					}
				}
				self::render_html_tag( 'span', $tooltip_attributes, null, false );
				self::render_html_tag( 'i', array( 'class' => 'dashicons ' . $icon ) );
				echo '</span>';
			}
		}

		/**
		 * Get data attributes for a tooltip from some tooltip config
		 *
		 * @param $tooltip_config
		 * @param string $default_position
		 * @param string $default_length
		 *
		 * @return array
		 */
		function get_tooltip_attributes( $tooltip_config, $default_position = 'down', $default_length = 'small' ) {
			$tooltip = $tooltip_config;
			$position = $default_position;
			$length = $default_length;

			if ( is_array( $tooltip_config ) ) {
				if ( isset( $tooltip_config['length'] ) ) {
					$length = $tooltip_config['length'];
				}
				if ( isset( $tooltip_config['position'] ) ) {
					$position = $tooltip_config['position'];
				}
				if ( isset( $tooltip_config['text'] ) ) {
					$tooltip = $tooltip_config['text'];
				}
			}

			return array(
				'data-balloon-length' => $length,
				'data-balloon-pos' => $position,
				'data-balloon' => $tooltip
			);
		}

		/**
		 * Render the field input container
		 *
		 * @param bool $override_attributes
		 */
		function render_input_container( $override_attributes = false ) {
			self::render_html_tag( 'div', array( 'class' => 'foofields-field-input' ), null, false );

			$this->render_input( $override_attributes );

			$this->render_description();

			echo '</div>';
		}

		/**
		 * Render the description after a field
		 */
		function render_description() {
			if ( ! empty( $this->description ) ) {
				self::render_html_tag( 'span', array(
					'class' => 'foofields-field-description'
				), $this->description );
			}
		}

		/**
		 * Render the field input
		 *
		 * @param bool $override_attributes
		 */
		function render_input( $override_attributes = false ) {
			$field_value = $this->value();

			$attributes = array(
				'id' => $this->unique_id,
				'name' => $this->name
			);

			if ( $override_attributes !== false ) {
				$attributes = wp_parse_args( $override_attributes, $attributes );
			}

			switch ( $this->type ) {

				case 'html':
					if ( isset( $this->config['html'] ) ) {
						echo $this->config['html'];
					}
					break;

				case 'select':
					self::render_html_tag( 'select', $attributes, null, false );
					foreach ( $this->choices as $value => $label ) {
						$option_attributes = array(
							'value' => $value
						);
						if ( $field_value == $value ) {
							$option_attributes['selected'] = 'selected';
						}
						self::render_html_tag( 'option', $option_attributes, $label );
					}
					echo '</select>';

					break;

				case 'text':
					if ( isset( $this->config['placeholder'] ) ) {
						$attributes['placeholder'] = $this->config['placeholder'];
					}
					$attributes['type'] = 'text';
					$attributes['value'] = $field_value;
					self::render_html_tag( 'input', $attributes );

					break;

				case 'number':
					if ( isset( $this->config['placeholder'] ) ) {
						$attributes['placeholder'] = $this->config['placeholder'];
					}
					$attributes['min'] = isset( $min ) ? $min : 0;
					$attributes['step'] = isset( $step ) ? $step : 1;
					$attributes['type'] = 'number';
					$attributes['value'] = $field_value;
					self::render_html_tag( 'input', $attributes );

					break;

				case 'date':
					if ( isset( $this->config['placeholder'] ) ) {
						$attributes['placeholder'] = $this->config['placeholder'];
					}
					$attributes['type'] = 'date';
					$attributes['min'] = isset( $this->config['min'] ) ? $this->config['min'] : '1900-01-01';
					$attributes['max'] = isset( $this->config['max'] ) ? $this->config['max'] : '';
					$attributes['value'] = $field_value;
					self::render_html_tag( 'input', $attributes );

					break;

				case 'color':
					$attributes['type'] = 'color';
					$attributes['value'] = $field_value;
					self::render_html_tag( 'input', $attributes );

					break;

				case 'colorpicker':
					$attributes['type'] = 'text';
					$attributes['value'] = $field_value;
					$attributes[] = 'data-wp-color-picker';
					self::render_html_tag( 'input', $attributes );

					break;

				case 'checkbox':
					if ( 'on' === $field_value ) {
						$attributes['checked'] = 'checked';
					}
					$attributes['value'] = 'on';
					$attributes['type'] = 'checkbox';
					self::render_html_tag( 'input', $attributes );
					break;


				case 'readonly':
					$attributes['type'] = 'hidden';

					self::render_html_tag( 'input', $attributes );

					$inner = $field_value;
					if ( isset( $this->config['display_function'] ) ) {
						$inner = call_user_func( $this->config['display_function'], $inner );
					}

					self::render_html_tag( 'span', array(), $inner );
					break;

				default:
					//the field type is not natively supported
					if ( isset( $this->config['function'] ) ) {
						call_user_func( $this->config['function'], $this );
					}
					break;
			}
		}

		/**
		 * Gets the value of the field from the container state
		 * @return mixed|string
		 */
		function value() {
			if ( isset( $this->override_value_function ) && is_callable( $this->override_value_function ) ) {
				return call_user_func( $this->override_value_function, $this->config );
			}

			return $this->container->get_state_value( $this->config );
		}

		/**
		 * verify the nonce for a ajax callback
		 *
		 * @return bool
		 */
		protected function verify_nonce() {
			$nonce = $this->sanitize_key( 'nonce' );

			if ( null !== $nonce ) {
				return wp_verify_nonce( $nonce, $this->unique_id );
			}
			return false;
		}

		/**
		 * Create a nonce for the field
		 *
		 * @return false|string
		 */
		protected function create_nonce() {
			return wp_create_nonce( $this->unique_id );
		}

		/**
		 * Get the value of the field from an array of posted data
		 * @param $sanitized_form_data
		 *
		 * @return mixed
		 */
		public function get_posted_value( $sanitized_form_data ) {
			if ( isset( $sanitized_form_data ) && is_array( $sanitized_form_data ) ) {

				if ( ! array_key_exists( $this->id, $sanitized_form_data ) ) {
					//the field had no posted value, check for a default
					if ( isset( $this->default ) ) {
						return $this->default;
					}
				} else {
					return $this->process_posted_value( $sanitized_form_data[ $this->id ] );
				}
			}
			return null;
		}

		/**
		 * Process a value for the field, including sanitization
		 *
		 * @param $unsanitized_value
		 *
		 * @return array|string
		 */
		public function process_posted_value( $unsanitized_value ) {
			return $this->clean( $unsanitized_value );
		}

		/**
		 * Returns the key used to store data for this field
		 * @return string
		 */
		public function field_data_key() {
			return $this->id;
		}

		/**
		 * Validates the field based on a value
		 *
		 * @param $posted_value
		 *
		 * @return bool
		 */
		public function validate( $posted_value ) {

			//check for required fields
			if ( isset( $this->required ) ) {
				if ( true === $this->required && empty( $posted_value) ) {
					$this->error = sprintf( __( '%s is required!', $this->container->text_domain ), $this->label );
				} else if ( is_array( $this->required ) ) {
					//check for more advanced required rules
					if ( isset( $this->required['minimum'] ) && intval( $this->required['minimum'] ) > 0 ) {
						$message = isset( $this->required['message'] ) ? $this->required['message'] : __( 'Please select a minimum of %d item(s) for %s!', $this->container->text_domain );
						if ( !isset( $posted_value ) || ( is_array( $posted_value ) && count( $posted_value ) < intval( $this->required['minimum'] ) ) ) {
							$this->error = sprintf( $message, intval( $this->required['minimum'] ), $this->label );
						}
					} else if ( isset( $this->required['maximum'] ) && intval( $this->required['maximum'] ) > 0 ) {
						$message = isset( $this->required['message'] ) ? $this->required['message'] : __( 'Please select a maximum of %d item(s) for %s!', $this->container->text_domain );
						if ( is_array( $posted_value ) && count( $posted_value ) > intval( $this->required['maximum'] ) ) {
							$this->error = sprintf( $message, intval( $this->required['maximum'] ), $this->label );
						}
					} else if ( isset( $this->required['exact'] ) && intval( $this->required['exact'] ) > 0 ) {
						$message = isset( $this->required['message'] ) ? $this->required['message'] : __( 'Please select exactly %d item(s) for %s!', $this->container->text_domain );
						if ( !isset( $posted_value ) || ( is_array( $posted_value ) && count( $posted_value ) !== intval( $this->required['exact'] ) ) ) {
							$this->error = sprintf( $message, intval( $this->required['exact'] ), $this->label );
						}
					} else if ( isset( $this->required['validation_function'] ) ) {
						$validation_result = call_user_func( $this->required['validation_function'], $posted_value, $this );
						if ( $validation_result === false ) {
							$message = isset( $this->required['message'] ) ? $this->required['message'] : __( 'Custom validation failed for %s!', $this->container->text_domain );
							$this->error = sprintf( $message, $this->label );
						}
					}
				}
			}

			return $this->error === false;
		}

		/**
		 * Get the error message from the state if it exists
		 */
		function get_error_from_state() {
			$state = $this->container->get_state();

			if ( isset( $state['__errors'] ) && array_key_exists( $this->field_data_key(), $state['__errors'] ) ) {
				$this->error = $state['__errors'][$this->field_data_key()]['message'];
			}
		}

		/**
		 * Builds up an ajax action for the field
		 *
		 * @return string
		 */
		function field_ajax_action_name() {
			return 'wp_ajax_' . $this->field_action_name();
		}

		/**
		 * Builds up the action name used in ajax calls
		 *
		 * @return string
		 */
		function field_action_name() {
			return 'foofields_' . $this->unique_id . '-field';
		}

		/**
		 *
		 * @return bool
		 */
		function visible() {
			return $this->container->show_rule_is_visible( $this->unique_id, 'fields' );
		}
	}
}
