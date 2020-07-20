<?php
namespace FooPlugins\FooFields\Admin\Metaboxes\Fields;

use FooPlugins\FooFields\Admin\Metaboxes\FieldRenderer;

if ( ! class_exists( 'FooPlugins\FooFields\Admin\Metaboxes\Fields\EmbedMetabox' ) ) {

	class EmbedMetabox extends Field {

		function __construct( $metabox_field_group, $field_type ) {
			parent::__construct( $metabox_field_group, $field_type );
		}

		/**
		 * Render the ajax button field
		 *
		 * @param $field
		 * @param $attributes
		 */
		function render( $field, $attributes ) {
			FieldRenderer::render_html_tag( 'div', array( 'data-metabox' => $field['metabox_id'] ) );
		}
	}
}
