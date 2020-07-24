<?php

namespace FooPlugins\FooFields\Admin\FooFields;

if ( ! class_exists( __NAMESPACE__ . '\Metabox' ) ) {

	abstract class Metabox extends Container {

		protected $post;

		function __construct( $config ) {
			parent::__construct( $config );

			//add the metaboxes for a person
			add_action( 'add_meta_boxes_' . $this->config['post_type'], array( $this, 'add_meta_boxes' ) );

			//save extra post data for a person
			add_action( 'save_post', array( $this, 'save_post' ) );

			//enqueue assets needed for this metabox
			add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_assets' ) );
		}

		/**
		 * Validate the config to ensure we have everything for a metabox
		 */
		function validate_config() {
			parent::validate_config();

			if ( !isset( $this->config['meta_key'] ) ) {
				if ( isset( $this->config['surpress_metakey_error'] ) && $this->config['surpress_metakey_error'] ) {
					//Do nothing. Suppress the error message for the missing meta_key
				} else {
					$this->add_validation_error( __( 'WARNING : There is no "meta_key" value set for the metabox, which means nothing will be saved! If this is intentional, then set "surpress_metakey_error" to true.' ) );
				}
			}
		}

		/**
		 * Builds up an identifier from post_type and metabox_id
		 * @return string
		 */
		public function container_id() {
			return $this->config['post_type'] . '-' . $this->config['metabox_id'];
		}

		/**
		 * The action and filter hook prefix
		 * @return string
		 */
		public function container_hook_prefix() {
			return __NAMESPACE__ . '\\' . $this->config['post_type'] . '\\' . $this->config['metabox_id'] . '\\';
		}

		/**
		 * Add metaboxe to the CPT
		 *
		 * @param $post
		 */
		function add_meta_boxes( $post ) {
			$this->post = $post;

			if ( !isset( $this->config['metabox_render_function'] ) ) {
				$this->config['metabox_render_function'] = array( $this, 'render_metabox' );
			}

			add_meta_box(
				$this->container_id(),
				$this->config['metabox_title'],
				$this->config['metabox_render_function'],
				$this->config['post_type'],
				isset( $this->config['context'] ) ? $this->config['context'] : 'normal',
				isset( $this->config['priority'] ) ? $this->config['priority'] : 'default'
			);
		}

		/**
		 * Render the metabox contents
		 *
		 * @param $post
		 */
		public function render_metabox( $post ) {
			$full_id = $this->container_id();

			//render the nonce used to validate when saving the metabox fields
			?><input type="hidden" name="<?php echo $full_id; ?>_nonce"
			         id="<?php echo $full_id; ?>_nonce"
			         value="<?php echo wp_create_nonce( $full_id ); ?>"/><?php

			//allow custom metabox rendering
			$this->do_action( 'Render\\' . $full_id, $post );

			//render any fields
			$this->render_container();
		}

		/**
		 * Get the data saved against the post
		 *
		 * @return array|mixed
		 */
		function get_state() {
			if ( !isset( $this->state ) ) {

				$state = array();

				if ( isset( $this->config['meta_key'] ) ) {
					//get the state from the post meta
					$state = get_post_meta( $this->post->ID, $this->config['meta_key'], true );
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
		 * Hook into the save post and save the fields
		 *
		 * @param $post_id
		 *
		 * @return mixed
		 */
		public function save_post( $post_id ) {
			// check autosave first
			if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
				return $post_id;
			}

			$full_id = $this->container_id();

			// verify nonce
			if ( array_key_exists( $full_id . '_nonce', $_POST ) &&
			     wp_verify_nonce( $_POST[ $full_id . '_nonce' ], $full_id ) ) {

				//if we get here, we are dealing with the correct metabox

				// unhook this function so it doesn't loop infinitely
				remove_action( 'save_post', array( $this, 'save_post' ) );

				//fire an action
				$this->do_action( 'Save', $post_id );

				//if we have fields, then we can save that data
				if ( $this->has_fields() ) {

					//get the current state of the posted form
					$state = $this->get_posted_data();

					$this->do_action( 'BeforeSavePostMeta', $post_id, $state );

					if ( isset( $this->config['meta_key'] ) ) {
						update_post_meta( $post_id, $this->config['meta_key'], $state );
					}

					$this->do_action( 'AfterSavePostMeta', $post_id, $state );
				}

				// re-hook this function
				add_action( 'save_post', array( $this, 'save_post' ) );
			}
		}

		/***
		 * Enqueue the assets needed by the metabox
		 *
		 * @param $hook_suffix
		 */
		function enqueue_assets( $hook_suffix ) {
			if ( in_array( $hook_suffix, array( 'post.php', 'post-new.php' ) ) ) {
				$screen = get_current_screen();

				//make sure we are on the correct post type page
				if ( is_object( $screen ) && $this->config['post_type'] == $screen->post_type ) {
					// Register, enqueue scripts and styles here

					$this->enqueue_all();
				}
			}
		}

		/**
		 * Override the container classes for metaboxes
		 *
		 * @return array
		 */
		function get_container_classes() {
			$classes = parent::get_container_classes();

			$classes[] = 'foofields-style-metabox';
			return $classes;
		}

		/**
		 * Renders styling needed for a metabox
		 */
		function render_fields_before() {
			?>
			<style>
				#<?php echo $this->container_id(); ?> .inside {
					margin: 0;
					padding: 0;
				}
			</style>
			<?php
		}
	}
}