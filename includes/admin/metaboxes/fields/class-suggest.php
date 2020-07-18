<?php

namespace FooPlugins\FooFields\Admin\Metaboxes\Fields;

use FooPlugins\FooFields\Admin\Metaboxes\FieldRenderer;

if ( ! class_exists( 'FooPlugins\FooFields\Admin\Metaboxes\Fields\Suggest' ) ) {

	class Suggest extends Field {

		function __construct( $metabox_field_group, $field_type ) {
			parent::__construct( $metabox_field_group, $field_type );

			//handle ajax auto suggest fields
			add_action( 'wp_ajax_foofields_suggest', array( $this, 'ajax_handle_autosuggest' ) );
		}

		function render( $field, $attributes ) {
			$query  = build_query( array(
				'nonce'      => wp_create_nonce( $field['input_id'] ),
				'query_type' => isset( $field['query_type'] ) ? $field['query_type'] : 'post',
				'query_data' => isset( $field['query_data'] ) ? $field['query_data'] : 'page'
			) );

			$attributes = wp_parse_args( array(
				'type'                   => 'text',
				'id'                     => $field['input_id'],
				'name'                   => $field['input_name'],
				'value'                  => $field['value'],
				'placeholder'            => isset( $field['placeholder'] ) ? $field['placeholder'] : '',
				'data-suggest',
				'data-suggest-query'     => $query,
				'data-suggest-multiple'  => isset( $field['multiple'] ) ? $field['multiple'] : 'false',
				'data-suggest-separator' => isset( $field['separator'] ) ? $field['separator'] : ','
			), $attributes );

			FieldRenderer::render_html_tag( 'input', $attributes );
		}

		/**
		 * Ajax handler for suggest fields
		 */
		function ajax_handle_autosuggest() {
			if ( wp_verify_nonce( $this->sanitize_key( 'nonce' ), 'foometafield_suggest' ) ) {
				$s     = $this->sanitize_text( 'q' );
				$comma = _x( ',', 'page delimiter' );
				if ( ',' !== $comma ) {
					$s = str_replace( $comma, ',', $s );
				}
				if ( false !== strpos( $s, ',' ) ) {
					$s = explode( ',', $s );
					$s = $s[ count( $s ) - 1 ];
				}
				$s = trim( $s );

				$results = array();

				$query_type = $this->sanitize_key( 'query_type' );
				$query_data = $this->sanitize_key( 'query_data' );

				if ( 'post' === $query_type ) {

					$posts = get_posts(
						array(
							's'              => $s,
							'posts_per_page' => 5,
							'post_type'      => $query_data
						)
					);

					foreach ( $posts as $post ) {
						$results[] = $post->post_title;
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
						$results[] = $term->name;
					}
				}

				echo join( $results, "\n" );
			}

			wp_die();
		}
	}
}
