<?php
/**
 * An abstract container that will house metaboxes and fields
 */

namespace FooPlugins\FooFields\Admin\FooFields;

use FooPlugins\FooFields\Admin\FooFields\Fields\Field;

if ( ! class_exists( __NAMESPACE__ . '\Container' ) ) {

	abstract class Container extends Base {

		/**
		 * @var array
		 */
		public $config;

		/**
		 * @var Field[]
		 */
		protected $fields = array();

		/**
		 * @var array
		 */
		protected $state = null;

		/**
		 * The textdomain of the plugin
		 * @var string
		 */
		public $text_domain;

		/**
		 * The base URL of the plugin. Used for building URL's for enqueue asset calls
		 * @var mixed
		 */
		public $plugin_url;

		/**
		 * The version of the plugin. Used for versioning enqueue asset calls
		 * @var mixed
		 */
		public $plugin_version;

		protected $validation_errors = array();

		protected $show_rules = array(
			'tabs'   => array(),
			'fields' => array()
		);

		const field_type_mappings = array(
			'ajaxbutton'      => __NAMESPACE__ . '\Fields\AjaxButton',
			'selectize'       => __NAMESPACE__ . '\Fields\Selectize',
			'selectize-multi' => __NAMESPACE__ . '\Fields\SelectizeMulti',
			'suggest'         => __NAMESPACE__ . '\Fields\Suggest',
			'embed-metabox'   => __NAMESPACE__ . '\Fields\EmbedMetabox',
			'repeater'        => __NAMESPACE__ . '\Fields\Repeater',
			'icon'            => __NAMESPACE__ . '\Fields\Icon',
			'help'            => __NAMESPACE__ . '\Fields\Icon',
			'error'           => __NAMESPACE__ . '\Fields\Icon',
			'heading'         => __NAMESPACE__ . '\Fields\Header',
			'textarea'        => __NAMESPACE__ . '\Fields\Textarea',
			'checkboxlist'    => __NAMESPACE__ . '\Fields\InputList',
			'radiolist'       => __NAMESPACE__ . '\Fields\InputList',
			'htmllist'        => __NAMESPACE__ . '\Fields\InputList',
			'repeater-delete' => __NAMESPACE__ . '\Fields\RepeaterDelete'
		);

		function __construct( $config ) {
			$this->config = $config;

			if ( isset( $config['text_domain'] ) ) {
				$this->text_domain = $config['text_domain'];
			}
			if ( isset( $config['plugin_url'] ) ) {
				$this->plugin_url = $config['plugin_url'];
			}
			if ( isset( $config['plugin_version'] ) ) {
				$this->plugin_version = $config['plugin_version'];
			}

			$this->validate_config();
			if ( isset( $this->config['fields'] ) ) {
				$this->parse_config( $this->config['fields'] );
			}
		}

		/**
		 * Base validation for all containers
		 */
		function validate_config() {
			if ( ! isset( $this->text_domain ) ) {
				$this->add_validation_error( __( 'ERROR : There is no "text_domain" value set! Translations will not work!' ) );
			}
			if ( ! isset( $this->plugin_url ) ) {
				$this->add_validation_error( __( 'ERROR : There is no "plugin_url" value set! Things will not work!' ) );
			}
			if ( ! isset( $this->plugin_version ) ) {
				$this->add_validation_error( __( 'ERROR : There is no "plugin_version" value set! Things will not work!' ) );
			}
		}

		/**
		 * Add a validation error and create an error field
		 *
		 * @param $error_message
		 */
		function add_validation_error( $error_message ) {
			$this->validation_errors[] = $error_message;

			$error_field = array(
				'id'   => 'validation_error_' . count( $this->validation_errors ),
				'type' => 'error',
				'desc' => $error_message
			);

			//append the error field to the start of the fields array
			if ( ! isset( $this->config['fields'] ) ) {
				$this->config['fields'] = array( $error_field );
			} else {
				$this->config['fields'] = array_merge( array( $error_field ), $this->config['fields'] );
			}
		}

		/**
		 * Finds all fields within the config
		 *
		 * @param $config
		 */
		function parse_config( &$config ) {
			if ( isset( $config['tabs'] ) ) {
				foreach ( $config['tabs'] as &$tab ) {
					$this->parse_config( $tab );

					//check if the tab has any data show rules
					$this->show_rule_add( $tab, 'tabs' );
				}
			}

			if ( isset( $config['fields'] ) ) {
				foreach ( $config['fields'] as &$field ) {
					$field_type = isset( $field['type'] ) ? $field['type'] : 'unknown';
					$this->create_field_instance( $field_type,$field );

					//check if the field has any data show rules
					$this->show_rule_add( $field, 'fields' );
				}
			}
		}

		/**
		 * Add show rules to an array for easier access later
		 *
		 * @param $config
		 * @param $config_type
		 */
		function show_rule_add( $config, $config_type ) {
			if ( isset( $config['data'] ) && isset( $config['data']['show-when'] ) ) {
				$this->show_rules[$config_type][ $this->get_unique_id($config) ] = $config['data']['show-when'];
			}
		}

		/***
		 * Determined if the tab/field config is visible
		 *
		 * @param $unique_id
		 * @param $type
		 *
		 * @return bool
		 */
		function show_rule_is_visible( $unique_id, $type ) {
			if ( array_key_exists( $unique_id, $this->show_rules[$type] ) ) {
				//we have show when rules for the tab/fields

				$show_rule = $this->show_rules[$type][$unique_id];
				$show_rule_value = $show_rule['value'];
				$show_rule_operator = isset( $show_rule['operator'] ) ? $show_rule['operator'] : '===';
				$show_rule_field_id = $this->get_unique_id( array( 'id' => $show_rule['field'] ) );
				$show_rule_field = $this->fields[$show_rule_field_id];
				$show_rule_field_value = $show_rule_field->value();

				if ( '===' === $show_rule_operator ) {
					if ( $show_rule_value === $show_rule_field_value ) {
						return true;
					}
				} else if ( '!==' === $show_rule_operator ) {
					if ( $show_rule_value !== $show_rule_field_value ) {
						return true;
					}
				} else if ( 'indexOf' === $show_rule_operator ) {
					if ( strpos( $show_rule_field_value, $show_rule_value ) !== false ) {
						return true;
					}
				} else if ( 'regex' === $show_rule_operator ) {
					if ( preg_match( $show_rule_value, $show_rule_field_value ) === 1 ) {
						return true;
					}
				}
				//otherwise it should not be visible
				return false;
			}

			//always visible by default
			return true;
		}

		/**
		 * Create a field instance
		 *
		 * @param $field_type
		 * @param $field_config
		 *
		 * @return Field|mixed
		 */
		function create_field_instance( $field_type, &$field_config ) {
			$field_id = $this->get_unique_id( $field_config );

			//check if we have a duplicate field id
			if ( array_key_exists( $field_id, $this->fields ) ) {
				$field_config['id'] = $field_config['id'] . '_duplicate';
				$field_config['type'] = $field_type = 'error';
				$field_config['text'] = sprintf( __( 'ERROR : Duplicate field id: %s', $this->text_domain ), $field_config['id'] );
				$field_id = $this->get_unique_id( $field_config );
			}

			if ( array_key_exists( $field_type, self::field_type_mappings ) ) {
				$field_instance_type = self::field_type_mappings[ $field_type ];
				$field_instance      = new $field_instance_type( $this, $field_type, $field_config );
			} else {
				$field_instance = new Field( $this, $field_type, $field_config );
			}
			$this->fields[ $field_id ] = $field_instance;

			//check if we have any show rules

			return $field_instance;
		}

		/**
		 * Returns a unique id for the config array
		 * @param $config
		 *
		 * @return string
		 */
		function get_unique_id( $config ) {
			return $this->container_id() . '_' . $config['id'];
		}

		/**
		 * Generate the field name used on the html input tag
		 *
		 * @param $field
		 *
		 * @return string
		 */
		public function get_field_name( $field ) {
			return sprintf( '%s[%s]', $this->container_id(), $field['id'] );
		}

		/**
		 * Returns true if the container has fields
		 * @return bool
		 */
		protected function has_fields() {
			return count( $this->fields ) > 0;
		}

		/**
		 * Gets the saved state from the database
		 * @return mixed
		 */
		abstract function get_state();

		/**
		 * Builds up an identifier for the container
		 * @return string
		 */
		abstract function container_id();

		/**
		 * The action and filter hook prefix
		 * @return string
		 */
		abstract function container_hook_prefix();

		/**
		 * Cater for both doing a do_action and call the function if it was passed in
		 *
		 * @param $tag
		 */
		public function do_action( $tag ) {
			$args = func_get_args();

			if ( isset( $this->config['actions'] ) && isset( $this->config['actions'][ $tag ] ) ) {
				call_user_func_array(
					$this->config['actions'][ $tag ],
					array_merge( array_slice( $args, 1 ) )
				);
			}

			call_user_func_array( 'do_action', array_merge(
				array( $this->container_hook_prefix() . $tag ),
				array_slice( $args, 1 )
			) );
		}

		/**
		 * Cater for both doing a apply_filters and call the function if it was passed in
		 *
		 * @param $tag
		 * @param mixed ...$arg
		 *
		 * @return mixed|void
		 */
		public function apply_filters( $tag, $value ) {
			$args = func_get_args();

			if ( isset( $this->config['filters'] ) && isset( $this->config['filters'][ $tag ] ) ) {
				return call_user_func_array(
					$this->config['filters'][ $tag ],
					array_slice( $args, 1 )
				);
			}

			return call_user_func_array( 'apply_filters', array_merge(
					array( $this->container_hook_prefix() . $tag ),
					array_slice( $args, 1 ) )
			);
		}

		/**
		 * Enqueues all assets
		 */
		protected function enqueue_all() {
			//enqueue assets if there are any fields
			if ( $this->has_fields() ) {
				wp_enqueue_script( 'selectize', $this->config['plugin_url'] . 'assets/vendor/selectize/selectize.min.js', array( 'jquery' ), $this->config['plugin_version'] );
				wp_enqueue_script( 'foofields', $this->config['plugin_url'] . 'assets/vendor/foofields/foofields.js', array(
					'jquery',
					'suggest',
					'wp-color-picker',
					'selectize'
				), $this->config['plugin_version'] );

				wp_enqueue_style( 'selectize', $this->config['plugin_url'] . 'assets/vendor/selectize/selectize.css', array(), $this->config['plugin_version'] );
				wp_enqueue_style( 'foofields', $this->config['plugin_url'] . 'assets/vendor/foofields/foofields.min.css', array(
					'wp-color-picker',
					'selectize'
				), $this->config['plugin_version'] );
			}

			$this->do_action( 'EnqueueAssets\\' . $this->container_id() );

			//enqueue any scripts provided from config
			if ( isset( $this->config['scripts'] ) ) {
				foreach ( $this->config['scripts'] as $script ) {
					wp_enqueue_script( $script['handle'], $script['src'], $script['deps'], $script['ver'], isset( $script['in_footer'] ) ? $script['in_footer'] : false );
				}
			}

			//enqueue any styles provided from config
			if ( isset( $this->config['styles'] ) ) {
				foreach ( $this->config['styles'] as $style ) {
					wp_enqueue_style( $style['handle'], $style['src'], $style['deps'], $style['ver'], isset( $style['media'] ) ? $style['media'] : 'all' );
				}
			}
		}

		/**
		 * Returns an array of container classes
		 *
		 * @return array
		 */
		function get_container_classes() {
			$classes[] = 'foofields-container';
			if ( ! isset( $this->config['layout'] ) ) {
				if ( isset( $this->config['fields'] ) && isset( $this->config['fields']['tabs'] ) ) {
					$classes[] = 'foofields-tabs-vertical';
				}
			} else {
				$classes[] = $this->config['layout'];
			}

			return $classes;
		}

		/**
		 * Renders all tabs and fields for a container
		 */
		function render_container() {
			if ( ! $this->has_fields() ) {
				return; //do nothing!
			}

			//process the fields based on the state and make any changes if needed
			//$this->process_state_before_render();

			$this->render_fields_before();

			self::render_html_tag( 'div', array( 'class' => implode( ' ', $this->get_container_classes() ) ), null, false );

			$this->render_tabs( $this->config['fields'] );

			$this->render_contents( $this->config['fields'] );

			echo '</div>';

			$this->render_fields_after();
		}

		protected function render_fields_before() {
			//does nothing by default
		}

		protected function render_fields_after() {
			//does nothing by default
		}

		/**
		 * Do any processing before the fields are rendered
		 */
		function process_state_before_render() {
			$state = $this->get_state();

			//get errors
		}

		/**
		 * Renders the tabs
		 *
		 * @param $fields
		 */
		function render_tabs( $fields ) {
			if ( ! isset( $fields['tabs'] ) ) {
				return;
			}

			echo '<ul class="foofields-tabs">';
			foreach ( $fields['tabs'] as $tab ) {
				$this->render_tab( $tab );
			}
			echo '</ul>';
		}

		/**
		 * Renders the contents
		 *
		 * @param $fields
		 */
		function render_contents( $fields ) {
			if ( ! isset( $fields['tabs'] ) ) {
				if ( isset( $fields['fields'] ) ) {
					$this->render_content( $fields );
				}

				return;
			}

			foreach ( $fields['tabs'] as $tab ) {
				$this->render_content( $tab );
			}
		}

		/**
		 * Renders a tab
		 *
		 * @param $tab
		 * @param string $class
		 */
		function render_tab( $tab, $class = 'foofields-tab', $anchor_class = 'foofields-tab-link' ) {
			$tab_content_id = $tab['id'];

			if ( ! isset( $tab['fields'] ) && isset( $tab['tabs'] ) ) {
				//set the tab_id to be the first child tab
				$tab_content_id = $tab['tabs'][0]['id'];
			}
			$tab_classes = array( $class );
			$tab_id = $this->get_unique_id( array( 'id' => $tab_content_id ) );
			if ( !$this->show_rule_is_visible( $tab_id, 'tabs' ) ) {
				$tab_classes[] = 'foofields-hidden';
			}
			$tab_attributes = array(
				'id' => $tab_id . '-tab',
				'class' => implode(' ', $tab_classes )
			);
			$tab_data_attributes = isset( $tab['data'] ) ? $tab['data'] : array();

			if ( count( $tab_data_attributes ) > 0 ) {
				$tab_attributes = array_merge( $tab_attributes, $this->process_data_attributes( $tab_data_attributes ) );
			}

			self::render_html_tag( 'li', $tab_attributes, null, false );
			self::render_html_tag( 'a', array( 'class' => $anchor_class, 'href' => '#' . $tab_id . '-content' ), null, false );
			if ( isset( $tab['icon'] ) ) {
				self::render_html_tag( 'span', array( 'class' => 'foofields-tab-icon dashicons ' . $tab['icon'] ) );
			}
			self::render_html_tag( 'span', array( 'class' => 'foofields-tab-text' ), $tab['label'] );

			if ( isset( $tab['errors'] ) ) {
				self::render_html_tag( 'span', array(
					'class' => 'foofields-tab-error',
					'title' => sprintf( _n( 'There is an error. Click to see more info.', 'There are %s errors. Click to see more info.', $tab['errors'] ), $tab['errors'] )
				), $tab['errors'] );
			}

			echo '</a>';
			if ( isset( $tab['tabs'] ) ) {
				echo '<ul class="foofields-tab-menu">';
				foreach ( $tab['tabs'] as $child_tab ) {
					self::render_tab( $child_tab, 'foofields-tab-menu-item', 'foofields-tab-menu-link' );
				}
				echo '</ul>';
			}
			echo '</li>';
		}

		/**
		 * Renders the tab content
		 *
		 * @param $content
		 */
		function render_content( $content ) {
			$classes[] = 'foofields-content';
			if ( isset( $content['class'] ) ) {
				$classes[] = $content['class'];
			}
			$content_id = $this->get_unique_id( $content ) . '-content';
			self::render_html_tag( 'div', array(
				'class' => implode( ' ', $classes ),
				'id'    => $content_id
			), null, false );

			if ( isset( $content['fields'] ) ) {
				$this->render_fields( $content['fields'] );
			}

			echo '</div>';

			if ( isset( $content['tabs'] ) ) {
				foreach ( $content['tabs'] as $tab ) {
					self::render_content( $tab );
				}
			}
		}

		/**
		 * Renders a group of fields
		 *
		 * @param array $fields
		 */
		function render_fields( $fields ) {
			foreach ( $fields as $field_config ) {
				$field_id = $this->get_unique_id( $field_config );
				if ( array_key_exists( $field_id, $this->fields ) ) {
					$field_instance = $this->fields[ $field_id ];
					$field_instance->pre_render();
					$field_instance->render();
				}
			}
		}

		/***
		 * Returns the field value from state, or gets a default value
		 *
		 * @param $field_config
		 *
		 * @return mixed|string
		 */
		function get_state_value( $field_config ) {
			$state = $this->get_state();

			if ( is_array( $state ) && array_key_exists( $field_config['id'], $state ) ) {
				return $state[ $field_config['id'] ];
			}

			if ( isset( $field_config['default'] ) ) {
				return $field_config['default'];
			}

			return '';
		}

		/**
		 * Get the sanitized posted data for the container
		 *
		 * @param $post_id
		 *
		 * @return mixed|void
		 */
		protected function get_posted_data() {

			$sanitized_data = $this->safe_get_from_request( $this->container_id(), array(), false );

			$posted_data = array();
			//loop through our flat list of fields and get all the data
			foreach ( $this->fields as $field ) {
				$posted_field_data = $field->get_posted_value( $sanitized_data );

				//validate the field
				if ( ! $field->validate( $posted_field_data ) ) {

					//add an error to the posted_data so that it is persisted
					if ( ! isset( $posted_data['__errors'] ) ) {
						$posted_data['__errors'] = array();
					}
					$posted_data['__errors'][ $field->field_data_key() ] = array(
						'message' => $field->error
					);
				}

				//if we got a value then add it to our posted_data
				if ( isset( $posted_field_data ) ) {
					$posted_data[ $field->field_data_key() ] = $posted_field_data;
				}
			}

			return $posted_data;
		}

		/**
		 * Process any special data attributes
		 * @param $key
		 * @param $value
		 *
		 * @return array
		 */
		function process_data_attribute( $key, $value ) {
			if ( 'show-when' === $key && is_array( $value ) ) {
				$value['field'] = $this->get_unique_id( array( 'id' => $value['field'] ) ) . '-field';
			}
			return is_array( $value ) ? json_encode( $value ) : $value;
		}

		/***
		 * Process all data attributes before they are rendered
		 *
		 * @param $data_attributes
		 *
		 * @return array
		 */
		function process_data_attributes( $data_attributes ) {
			$result = array();
			if ( is_array( $data_attributes ) && count( $data_attributes ) > 0 ) {
				foreach ( $data_attributes as $key => $value ) {
					$process_value = $this->process_data_attribute( $key, $value );
					if ( strpos( $key, 'data-') !== 0 ) {
						$key = 'data-' . $key;
					}
					$result[$key] = $process_value;
				}
			}
			return $result;
		}
	}
}
