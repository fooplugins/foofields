<?php
namespace FooPlugins\FooFields\Taxonomies;

if( ! class_exists( 'FooPlugins\FooFields\Taxonomies\Genre' ) ) {
 	class Genre {

		function __construct() {
			add_action( 'init', array( $this, 'register' ) );
		}

		function register() {
			//allow others to override the Genre taxonomy register args
			//see all available args : https://codex.wordpress.org/Function_Reference/register_taxonomy
			$args = apply_filters( 'FooPlugins\FooFields\Taxonomies\Genre\RegisterArgs',
				array(
					'labels' => array(
						'name'              => __( 'Genres', 'taxonomy general name', 'foofields' ),
						'singular_name'     => __( 'Genre', 'taxonomy singular name', 'foofields' ),
						'search_items'      => __( 'Search Genres', 'foofields' ),
						'all_items'         => __( 'All Genres', 'foofields' ),
						'parent_item'       => __( 'Parent Genre', 'foofields' ),
						'parent_item_colon' => __( 'Parent Genre:', 'foofields' ),
						'edit_item'         => __( 'Edit Genre', 'foofields' ),
						'update_item'       => __( 'Update Genre', 'foofields' ),
						'add_new_item'      => __( 'Add New Genre', 'foofields' ),
						'new_item_name'     => __( 'New Genre Name', 'foofields' ),
						'menu_name'         => __( 'Genres', 'foofields' ),
					),
					'hierarchical' 		=> true,
					'show_ui'           => true,
					'show_in_rest'  	=> true,
					'show_admin_column' => true
				)
			);

			register_taxonomy( FOOFIELDS_CT_GENRE, array( FOOFIELDS_CPT_MOVIE ), $args );

		}
	}
}
