<?php
namespace FooPlugins\FooFields\PostTypes;

/*
 * Movie Custom Post Type
 */

if ( ! class_exists( 'FooPlugins\FooFields\PostTypes\Movie' ) ) {

	class Movie {

		function __construct() {
			//register the post types
			add_action( 'init', array( $this, 'register' ) );
		}

		function register() {
			//allow others to override the Movie post type register args
			//see all available args : https://developer.wordpress.org/reference/functions/register_post_type/
			$args = apply_filters( 'FooPlugins\FooFields\PostTypes\Movie\RegisterArgs',
				array(
					'labels'        => array(
						'name'               => __( 'Movies', 'foofields' ),
						'singular_name'      => __( 'Movie', 'foofields' ),
						'add_new'            => __( 'Add Movie', 'foofields' ),
						'add_new_item'       => __( 'Add New Movie', 'foofields' ),
						'edit_item'          => __( 'Edit Movie', 'foofields' ),
						'new_item'           => __( 'New Movie', 'foofields' ),
						'view_item'          => __( 'View Movies', 'foofields' ),
						'search_items'       => __( 'Search Movies', 'foofields' ),
						'not_found'          => __( 'No Movies found', 'foofields' ),
						'not_found_in_trash' => __( 'No Movies found in Trash', 'foofields' ),
						'menu_name'          => __( 'FooFields', 'foofields' ),
						'all_items'          => __( 'Movies', 'foofields' )
					),
					'hierarchical'  => true,
					'public'        => false,
					'rewrite'       => false,
					'show_ui'       => true,
					'show_in_menu'  => true,
					'menu_icon'     => 'dashicons-editor-kitchensink',
					'supports'      => array( 'title', 'thumbnail', 'custom-fields' ),
				)
			);

			register_post_type( FOOFIELDS_CPT_MOVIE, $args );
		}
	}
}
