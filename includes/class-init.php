<?php
namespace FooPlugins\FooFields;

/**
 * FooFields Init Class
 * Runs at the startup of the plugin
 * Assumes after all checks have been made, and all is good to go!
 */

if ( !class_exists( 'FooPlugins\FooFields\Init' ) ) {

	class Init {

		/**
		 * Initialize the plugin by setting localization, filters, and administration functions.
		 */
		public function __construct() {
			//load the plugin text domain
			add_action( 'plugins_loaded', function() {
				load_plugin_textdomain(
					FOOFIELDS_SLUG,
					false,
					plugin_basename( FOOFIELDS_FILE ) . '/languages/'
				);
			});


			new namespace\PostTypes\Movie();
			new namespace\Taxonomies\Genre();
			new namespace\Taxonomies\Actor();

			if ( is_admin() ) {
				new namespace\Admin\Init();
			}
		}
	}
}
