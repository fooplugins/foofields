<?php

namespace FooPlugins\FooFields\Admin\FooFields\Fields;

if ( ! class_exists( __NAMESPACE__ . '\Suggest' ) ) {

	class Suggest extends Field {

		function __construct( $container, $type, $field_config ) {
			parent::__construct( $container, $type, $field_config );

			//handle ajax auto suggest fields
			add_action( 'wp_ajax_foofields_suggest_' . $this->unique_id . '-field', array( $this, 'ajax_handle_autosuggest' ) );
		}

		/**
		 * Renders the autosuggest field
		 *
		 * @param $optional_attributes
		 *
		 * @return mixed|void
		 */
		function render_input( $override_attributes = false ) {
			$query  = build_query( array(
				'action'     => 'foofields_suggest',
				'nonce'      => wp_create_nonce( $this->unique_id )
			) );

			$attributes = wp_parse_args( $override_attributes, array(
				'type'                   => 'text',
				'id'                     => $this->unique_id,
				'name'                   => $this->name,
				'value'                  => $this->value(),
				'placeholder'            => isset( $field['placeholder'] ) ? $field['placeholder'] : '',
				'data-suggest',
				'data-suggest-query'     => $query,
				'data-suggest-multiple'  => isset( $field['multiple'] ) ? $field['multiple'] : 'false',
				'data-suggest-separator' => isset( $field['separator'] ) ? $field['separator'] : ','
			) );

			self::render_html_tag( 'input', $attributes );
		}

		/**
		 * Ajax handler for suggest fields
		 */
		function ajax_handle_autosuggest() {
			if ( $this->verify_nonce() ) {
				$action = $this->build_field_id( $field );

				$s = $this->sanitize_text( 'q' );
				$comma = _x( ',', 'page delimiter' );
				if ( ',' !== $comma ) {
					$s = str_replace( $comma, ',', $s );
				}
				if ( false !== strpos( $s, ',' ) ) {
					$s = explode( ',', $s );
					$s = $s[ count( $s ) - 1 ];
				}
				$s = trim( $s );

				if ( !empty( $s ) ) {
					$this->metabox_field_group->do_action( 'Suggest\\' . $action, $s, $field );

					if ( isset( $field['query_type'] ) && isset( $field['query_data'] ) ) {
						$query_type = $field['query_type'];
						$query_data = $field['query_data'];

						$results = array();

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
				}
			}

			wp_die();
		}
	}
}
