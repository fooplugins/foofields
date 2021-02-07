<?php
namespace FooPlugins\FooFields\Admin;

use FooPlugins\FooFields\Admin\FooFields\Manager;

/**
 * FooFields Manager Class
 */

if ( !class_exists( 'FooPlugins\FooFields\Admin\ContainerManager' ) ) {

	class ContainerManager extends Manager {

		public function __construct() {
			parent::__construct( array(
				'id'             => FOOFIELDS_SLUG,
				'text_domain'    => FOOFIELDS_SLUG,
				'plugin_url'     => FOOFIELDS_URL,
				'plugin_version' => FOOFIELDS_VERSION
			) );
		}
	}
}
