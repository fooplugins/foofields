<?php
namespace FooPlugins\FooFields\Taxonomies;

if( ! class_exists( 'FooPlugins\FooFields\Taxonomies\Actor' ) ) {
 	class Actor {

		function __construct() {
			add_action( 'init', array( $this, 'register' ) );
		}

		function register() {
			//allow others to override the Actor taxonomy register args
			//see all available args : https://codex.wordpress.org/Function_Reference/register_taxonomy
			$args = apply_filters( 'FooPlugins\FooFields\Taxonomies\Actor\RegisterArgs',
				array(
					'labels' => array(
						'name'              => __( 'Actors', 'taxonomy general name', 'foofields' ),
						'singular_name'     => __( 'Actor', 'taxonomy singular name', 'foofields' ),
						'search_items'      => __( 'Search Actors', 'foofields' ),
						'all_items'         => __( 'All Actors', 'foofields' ),
						'parent_item'       => __( 'Parent Actor', 'foofields' ),
						'parent_item_colon' => __( 'Parent Actor:', 'foofields' ),
						'edit_item'         => __( 'Edit Actor', 'foofields' ),
						'update_item'       => __( 'Update Actor', 'foofields' ),
						'add_new_item'      => __( 'Add New Actor', 'foofields' ),
						'new_item_name'     => __( 'New Actor Name', 'foofields' ),
						'menu_name'         => __( 'Actors', 'foofields' ),
					),
					'hierarchical' 		=> false,
					'show_ui'           => true,
					'show_in_rest'  	=> true,
					'show_admin_column' => true
				)
			);

			register_taxonomy( FOOFIELDS_CT_ACTOR, array( FOOFIELDS_CPT_MOVIE ), $args );

		}
	}
}
