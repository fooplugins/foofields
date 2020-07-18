<?php

namespace FooPlugins\FooFields\Admin\Metaboxes\Fields;

use FooPlugins\FooFields\Admin\Metaboxes\FieldRenderer;

if ( ! class_exists( 'FooPlugins\FooFields\Admin\Metaboxes\Fields\Selectize' ) ) {

	class Selectize extends Field {

		function __construct( $metabox_field_group, $field_type ) {
			parent::__construct( $metabox_field_group, $field_type );

			//handle ajax selectize fields
			add_action( 'wp_ajax_foofields_selectize', array( $this, 'ajax_handle_selectize' ) );
		}

		/**
		 * Render the selectize field
		 *
		 * @param $field
		 */
		function render( $field ) {
			$query  = build_query( array(
				'action'     => 'foofields_selectize',
				'nonce'      => wp_create_nonce( $field['input_id'] ),
			) );

			$value = ( isset( $field['value'] ) && is_array( $field['value'] ) ) ? $field['value'] : array(
				'value'   => '',
				'display' => ''
			);

			FieldRenderer::render_html_tag( 'input', array(
				'type'  => 'hidden',
				'id'    => $field['input_id'] . '_display',
				'name'  => $field['input_name'] . '[display]',
				'value' => $value['display']
			) );

			$inner = '';

			if ( isset( $value['value'] ) ) {
				$inner = '<option value="' . esc_attr( $value['value'] ) . '" selected="selected">' . esc_html( $value['display'] ) . '</option>';
			}

			FieldRenderer::render_html_tag( 'select', array(
				'id'          => $field['input_id'],
				'name'        => $field['input_name'] . '[value]',
				'value'       => $value['value'],
				'placeholder' => $field['placeholder'],
				'data-query'  => $query
			), $inner, true, false );
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
