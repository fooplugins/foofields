<?php

/**
 * An settings container that will house fields
 */

namespace FooPlugins\FooFields\Admin\FooFields;

if ( ! class_exists( __NAMESPACE__ . '\Settings' ) ) {

	abstract class Settings extends Container {

		function __construct( $config ) {
			parent::__construct( $config );

			//add the menu for the settings page
			add_action( 'admin_menu', array( $this, 'add_menu' ) );

			//enqueue assets needed for this metabox
			add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_assets' ) );
		}

		/**
		 * Validate the config to ensure we have everything for a metabox
		 */
		function validate_config() {
			parent::validate_config();

			if ( !isset( $this->config['options_key'] ) ) {
				$this->add_validation_error( __( 'ERROR : There is no "options_key" value set for the settings page, which means nothing will be saved!' ) );
			}
		}

		/**
		 * Get the data saved in the options table
		 *
		 * @return array|mixed
		 */
		function get_state() {
			if ( !isset( $this->state ) ) {

				$state = array();

				if ( isset( $this->config['options_key'] ) ) {
					//get the state from the post meta
					$state = get_option( $this->config['options_key'] );
				}

				if ( ! is_array( $state ) ) {
					$state = array();
				}

				$state = $this->apply_filters( 'GetState', $state, $this->post );

				$this->state = $state;
			}

			return $this->state;
		}

		/**
		 * Builds up a simple identifier for the container
		 * @return mixed|string
		 */
		function container_id() {
			return 'settings_ ' . $this->config['settings_id'];
		}

		/**
		 * The action and filter hook prefix
		 * @return string
		 */
		public function container_hook_prefix() {
			return __NAMESPACE__ . '\Settings\\' . $this->config['settings_id'] . '\\';
		}

		/**
		 * Add menu to the tools menu
		 */
		public function add_menu() {
			add_submenu_page(
				'edit.php?post_type=foofields_movie',
				__( 'FooFields Settings' , 'foofields' ),
				__( 'Settings' , 'foofields' ),
				'manage_options',
				'foofields-settings',
				array( $this, 'render_settings_page' )
			);
		}

		/**
		 * Renders the contents for the settings page
		 */
		public function render_settings_page() {
			echo 'SETTINGS';
		}

		/**
		 * Override the container classes for metaboxes
		 *
		 * @return array
		 */
		function get_container_classes() {
			$classes = parent::get_container_classes();
			return $classes;
		}
	}
}
