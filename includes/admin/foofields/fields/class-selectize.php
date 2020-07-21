<?php

namespace FooPlugins\FooFields\Admin\FooFields\Fields;

if ( ! class_exists( __NAMESPACE__ . '\Selectize' ) ) {

	class Selectize extends Field {

		function __construct( $container, $type, $field_config ) {
			parent::__construct( $container, $type, $field_config );

			//handle ajax selectize fields
			add_action( 'wp_ajax_foofields_selectize_' . $this->unique_id . '-field', array( $this, 'ajax_handle_selectize' ) );
		}

		/**
		 * Render the selectize field
		 *
		 * @param $optional_attributes
		 */
		function render_input( $override_attributes = false ) {
			$query  = build_query( array(
				'action'     => 'foofields_selectize',
				'nonce'      => wp_create_nonce( $this->unique_id ),
			) );

			$value = $this->value();

			if ( !is_array( $value ) ) {
				$value = array(
					'value'   => '',
					'display' => ''
				);
			}

			self::render_html_tag( 'input', array(
				'type'  => 'hidden',
				'id'    => $this->unique_id . '_display',
				'name'  => $this->name . '[display]',
				'value' => $value['display']
			) );

			$inner = '';

			if ( isset( $value['value'] ) ) {
				$inner = '<option value="' . esc_attr( $value['value'] ) . '" selected="selected">' . esc_html( $value['display'] ) . '</option>';
			}

			self::render_html_tag( 'select', array(
				'id'          => $this->unique_id,
				'name'        => $this->name . '[value]',
				'value'       => $value['value'],
				'placeholder' => $this->config['placeholder'],
				'data-query'  => $query
			), $inner, true, false );
		}

		/**
		 * Ajax handler for selectize fields
		 */
		function ajax_handle_selectize() {
			if ( $this->verify_nonce() ) {
				$s = trim( $this->safe_get_from_request( 'q' ) );
				if ( !empty( $s ) ) {
					$results = array();

					$query_type = isset( $this->config['query_type'] ) ? $this->config['query_type'] : 'post';
					$query_data = isset( $this->config['query_data'] ) ? $this->config['query_data'] : 'page';

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
