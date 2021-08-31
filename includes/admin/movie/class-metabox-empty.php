<?php

namespace FooPlugins\FooFields\Admin\Movie;


use FooPlugins\FooFields\Admin\FooFields\Metabox;

if ( ! class_exists( 'FooPlugins\FooFields\Admin\Movie\MetaboxEmpty' ) ) {

	class MetaboxEmpty extends Metabox {

		function __construct() {
			parent::__construct(
				array(
					'manager'        => FOOFIELDS_SLUG,
					'post_type'      => FOOFIELDS_CPT_MOVIE,
					'metabox_id'     => 'details',
					'unique_id'      => 'movie_details_empty',
					'metabox_title'  => __( 'This Metabox Is Empty', 'foofields' ),
					'priority'       => 'default', //low, default, high
					'surpress_metakey_error'       => true,
					'condition'      => array(
						'meta_key' => FOOFIELDS_MOVIE_META_TYPE,
						'field_id' => 'type',
						'field_value' => '' // Only show this metabox if the type field of another metaobx is not set
					)
				)
			);
		}

		function get_fields() {
			return array(
				array(
					'id'       => 'hide_empty_metabox',
					'html'     => '<style>#foofields_movie-details { display:none; }</style>',
					'type'     => 'html',
				),
			);
		}
	}
}
