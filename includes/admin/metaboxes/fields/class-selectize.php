<?php

namespace FooPlugins\FooFields\Admin\Metaboxes\Fields;

if ( ! class_exists( 'FooPlugins\FooFields\Admin\Metaboxes\Fields\Selectize' ) ) {

	class Selectize extends Field {

		function __construct( $metabox_field_group ) {
			parent::__construct( $metabox_field_group );

			//handle ajax selectize fields
			add_action( 'wp_ajax_foofields_selectize', array( $this, 'ajax_handle_selectize' ) );
		}

		/**
		 * Ajax handler for selectize fields
		 */
		function ajax_handle_selectize() {
			$field = $this->find_field_for_ajax_handler_based_on_nonce( 'selectize' );
			if ( $field !== false ) {
				$s = trim( $this->safe_get_from_request( 'q' ) );
				if ( !empty( $s ) ) {
					$results = array();

					$query_type = isset( $field['query_type'] ) ? $field['query_type'] : 'post';
					$query_data = isset( $field['query_data'] ) ? $field['query_data'] : 'page';

					if ( 'post' === $query_type ) {

						$posts = get_posts(
							array(
								's'              => $s,
								'posts_per_page' => 5,
								'post_type'      => $query_data
							)
						);

						foreach ( $posts as $post ) {
							$results[] = array(
								'id' => $post->ID,
								'text' => $post->post_title
							);
						}

					} else if ( 'taxonomy' == $query_type ) {

						$terms = get_terms(
							array(
								'search'         => $s,
								'taxonomy'       => $query_data,
								'hide_empty'     => false
							)
						);

						foreach ( $terms as $term ) {
							$results[] = array(
								'id' => $term->term_id,
								'text' => $term->name
							);
						}
					}

					wp_send_json( array(
						'results' => $results
					) );

					return;
				}
			}
		}
	}
}
