<?php
namespace FooPlugins\FooFields\Admin\FooFields\Fields;

if ( ! class_exists( __NAMESPACE__ . '\EmbedMetabox' ) ) {

	class EmbedMetabox extends Field {

		/**
		 * Render the ajax button field
		 */
		function render_input( $override_attributes = false ) {
			self::render_html_tag( 'div', array( 'data-metabox' => $this->config['metabox_id'] ) );
		}
	}
}
