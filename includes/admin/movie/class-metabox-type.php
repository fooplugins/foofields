<?php

namespace FooPlugins\FooFields\Admin\Movie;


use FooPlugins\FooFields\Admin\FooFields\Metabox;

if ( ! class_exists( 'FooPlugins\FooFields\Admin\Movie\MetaboxType' ) ) {

	class MetaboxType extends Metabox {

		function __construct() {
			parent::__construct(
				array(
					'manager'        => FOOFIELDS_SLUG,
					'post_type'      => FOOFIELDS_CPT_MOVIE,
					'metabox_id'     => 'type',
					'metabox_title'  => __( 'Select Movie Type', 'foofields' ),
					'priority'       => 'default', //low, default, high
					'meta_key'       => FOOFIELDS_MOVIE_META_TYPE,
					'text_domain'    => FOOFIELDS_SLUG,
					'plugin_url'     => FOOFIELDS_URL,
					'plugin_version' => FOOFIELDS_VERSION,
					//'layout'         => 'foofields-tabs-vertical'
				)
			);
		}

		/**
		 * Runs when the type is changed
		 *
		 * @param $field
		 */
		function handle_type_change( $field, $value ) {
			$metabox_html = '';
			$metabox_title = '';
			if ( '' !== $value ) {
				$post_id = self::sanitize( $_POST['postID'] );
				$metabox = $this->manager->get_container(  'movie_details_' . $value );
				ob_start();
				$metabox->render_metabox( get_post( $post_id ) );
				$metabox_title = $metabox->config['metabox_title'];
				$metabox_html = ob_get_contents();
				ob_end_clean();
			}
			wp_send_json_success( array(
				'message' => sprintf( __( 'Value changed to: %s', 'foofields' ), $value ),
//				'replace' => array(
//					'target' => '#foofields_movie-details .inside',
//					'html' => $metabox_html,
//					'show' => '#foofields_movie-details',
//				),
				'metabox' => array(
					'id' => 'foofields_movie-details',
					'html' => $metabox_html,
					'title' => $metabox_title
				)
			) );
		}

		function get_fields() {
			return array(
				array(
					'id'       => 'type',
					'label'    => __( 'Choose Type', 'foofields' ),
					'desc'     => __( 'Choosing a type will show/hide an entire metabox', 'foofields' ),
					'type'     => 'htmllist',
					'spacer'   => '',
					'callback' => array( $this, 'handle_type_change' ),
					'choices' => array(
						'simple' => array(
							'html' => '<img src="https://dummyimage.com/64x32/000/fff&text=Simple" />',
							'label' => __( 'Simple', 'foofields' ),
							'tooltip' => __( 'Show A Metabox with Simple Fields', 'foofields' ),
							'load_metabox_options' => array(
								'show_metabox' => 'movie_simple',
								'method'       => 'replace'
							)
						),
						'advanced' => array(
							'html' => '<img src="https://dummyimage.com/64x32/000/fff&text=Advanced" />',
							'label' => __( 'Show A Metabox with Advanced Fields', 'foofields' ),
							'load_metabox_options' => array(
								'show_metabox' => 'movie_advanced',
								'method'       => 'replace'
							)
						)
					)
				)
			);
		}
	}
}
