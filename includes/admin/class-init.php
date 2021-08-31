<?php
namespace FooPlugins\FooFields\Admin;

/**
 * FooFields Admin Init Class
 * Runs all classes that need to run in the admin
 */

if ( !class_exists( 'FooPlugins\FooFields\Admin\Init' ) ) {

	class Init {

		/**
		 * Init constructor.
		 */
		function __construct() {
			new namespace\Updates();

			new namespace\ContainerManager();
			new namespace\Settings();
			new namespace\Movie\MetaboxType();
			new namespace\Movie\MetaboxEmpty();
			new namespace\Movie\MetaboxSimple();
			new namespace\Movie\MetaboxAdvanced();
		}
	}
}
