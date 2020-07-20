<?php

namespace FooPlugins\FooFields\Admin\Metaboxes;

if ( ! class_exists( 'FooPlugins\FooFields\Admin\Metaboxes\CustomPostTypeMetabox' ) ) {

	abstract class CustomPostTypeMetabox {

		protected $metabox;

		function __construct( $metabox ) {
			$this->metabox = $metabox;

			//add the metaboxes for a person
			add_action( 'add_meta_boxes_' . $metabox['post_type'], array( $this, 'add_meta_boxes' ) );

			//save extra post data for a person
			add_action( 'save_post', array( $this, 'save_post' ) );

			//enqueue assets needed for this metabox
			add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_assets' ) );
		}

		/**
		 * Add metaboxe to the CPT
		 *
		 * @param $post
		 */
		function add_meta_boxes( $post ) {
			add_meta_box(
				$this->metabox_id(),
				$this->metabox['metabox_title'],
				$this->metabox['metabox_render_function'],
				$this->metabox['post_type'],
				isset( $this->metabox['context'] ) ? $this->metabox['context'] : 'normal',
				isset( $this->metabox['priority'] ) ? $this->metabox['priority'] : 'default'
			);
		}

		/**
		 * Builds up an identifier from post_type and metabox_id
		 * @return string
		 */
		public function metabox_id() {
			return $this->metabox['post_type'] . '-' . $this->metabox['metabox_id'];
		}

		public function metabox_hook_prefix() {
			return __NAMESPACE__ . '\\' . $this->metabox['post_type'] . '\\' . $this->metabox['metabox_id'] . '\\';
		}

		/**
		 * Cater for both doing a do_action and call the function if it was passed in
		 *
		 * @param $tag
		 */
		public function do_action( $tag ) {
			$args = func_get_args();

			if ( isset( $this->metabox['actions'] ) && isset( $this->metabox['actions'][$tag] ) ) {
				call_user_func_array(
					$this->metabox['actions'][$tag],
					array_merge( array_slice( $args, 1 ) )
				);
			}

			call_user_func_array( 'do_action', array_merge(
				array( $this->metabox_hook_prefix() . $tag ),
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

			if ( isset( $this->metabox['filters'] ) && isset( $this->metabox['filters'][$tag] ) ) {
				return call_user_func_array(
					$this->metabox['filters'][$tag],
					array_slice( $args, 1 )
				);
			}

			return call_user_func_array( 'apply_filters', array_merge(
				array( $this->metabox_hook_prefix() . $tag ),
				array_slice( $args, 1 ) )
			);
		}

		/**
		 * Render the metabox contents
		 *
		 * @param $post
		 */
		public function render_metabox( $post ) {
			$full_id = $this->metabox_id();

			//render the nonce used to validate when saving the metabox fields
			?><input type="hidden" name="<?php echo $full_id; ?>_nonce"
			         id="<?php echo $full_id; ?>_nonce"
			         value="<?php echo wp_create_nonce( $full_id ); ?>"/><?php

			$this->do_action( 'Render', $post );
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

			$full_id = $this->metabox_id();

			// verify nonce
			if ( array_key_exists( $full_id . '_nonce', $_POST ) &&
			     wp_verify_nonce( $_POST[ $full_id . '_nonce' ], $full_id ) ) {

				//if we get here, we are dealing with the correct metabox

				// unhook this function so it doesn't loop infinitely
				remove_action( 'save_post', array( $this, 'save_post' ) );

				$this->do_action( 'Save', $post_id );

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

				if ( is_object( $screen ) && $this->metabox['post_type'] == $screen->post_type ) {
					// Register, enqueue scripts and styles here

					$this->do_action( 'EnqueueAssets' );

					if ( isset( $this->metabox['scripts'] ) ) {
						foreach ( $this->metabox['scripts'] as $script ) {
							wp_enqueue_script( $script['handle'], $script['src'], $script['deps'], $script['ver'], isset( $script['in_footer'] ) ? $script['in_footer'] : false );
						}
					}

					if ( isset( $this->metabox['styles'] ) ) {
						foreach ( $this->metabox['styles'] as $style ) {
							wp_enqueue_style( $style['handle'], $style['src'], $style['deps'], $style['ver'], isset( $style['media'] ) ? $style['media'] : 'all' );
						}
					}
				}
			}
		}

		/**
		 * Clean variables using sanitize_text_field. Arrays are cleaned recursively.
		 * Non-scalar values are ignored.
		 *
		 * @param string|array $var Data to sanitize.
		 * @return string|array
		 */
		public function clean( $var ) {
			if ( is_array( $var ) ) {
				return array_map( array($this, 'clean') , $var );
			} else {
				return is_scalar( $var ) ? sanitize_text_field( $var ) : $var;
			}
		}

		/**
		 * Safe way to get value from the request object
		 *
		 * @param $key
		 * @param null $default
		 * @param bool $clean
		 *
		 * @return mixed
		 */
		public function safe_get_from_request( $key, $default = null, $clean = true ) {
			if ( isset( $_REQUEST[$key] ) ) {
				$value = wp_unslash( $_REQUEST[$key] );
				if ( $clean ) {
					return $this->clean( $value );
				}
				return $value;
			}

			return $default;
		}

		/**
		 * Run clean over posted textarea but maintain line breaks.
		 *
		 * @param  string $var Data to sanitize.
		 * @return string
		 */
		public function sanitize_textarea( $var ) {
			return implode( "\n", array_map( array( $this, 'clean' ), explode( "\n", $var ) ) );
		}

		/**
		 * Return a sanitized and unslashed key from $_REQUEST
		 * @param $key
		 *
		 * @return string|null
		 */
		public function sanitize_key( $key ) {
			if ( isset( $_REQUEST[$key] ) ) {
				return sanitize_key( wp_unslash( $_REQUEST[ $key ] ) );
			}
			return null;
		}

		/**
		 * Return a sanitized and unslashed value from $_REQUEST
		 * @param $key
		 *
		 * @return string|null
		 */
		public function sanitize_text( $key ) {
			if ( isset( $_REQUEST[$key] ) ) {
				return sanitize_text_field( wp_unslash( $_REQUEST[ $key ] ) );
			}
			return null;
		}
	}
}