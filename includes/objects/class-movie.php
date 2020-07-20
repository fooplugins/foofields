<?php
namespace FooPlugins\FooFields\Objects;

use stdClass;

/**
 * The main Movie class
 */
if ( ! class_exists( 'FooPlugins\FooFields\Objects\Movie' ) ) {

	class Movie extends stdClass {
		private $_post;

		/**
		 * constructor for a new instance
		 *
		 * @param $post
		 */
		function __construct($post = null) {
			$this->_post = null;
			$this->ID = 0;
			if ( isset( $post ) ) {
				$this->_post = $post;
				$this->ID = $post->ID;
				$this->slug = $post->post_name;
				$this->name = $post->post_title;
				do_action( 'FooPlugins\FooFields\Objects\Movie\Loaded', $this );
			}
		}

		/**
		 * Static function to load an instance by slug
		 *
		 * @param $slug
		 *
		 * @return Movie | boolean
		 */
		public static function get_by_slug( $slug ) {
			$args = array(
				'name'        => $slug,
				'post_type'   => FOOFIELDS_CPT_MOVIE,
				'post_status' => 'publish',
				'numberposts' => 1
			);

			$plugins = get_posts( $args );
			if ( $plugins ) {
				return new self( $plugins[0] );
			}
			return false;
		}

		/**
		 * Static function to load an instance by post id
		 *
		 * @param $post_id
		 *
		 * @return Movie | boolean
		 */
		public static function get_by_id( $post_id ) {
			$post = get_post( intval( $post_id ) );
			if ( $post ) {
				return new self( $post );
			}
			return false;
		}
	}
}
