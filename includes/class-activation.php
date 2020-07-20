<?php
namespace FooPlugins\FooFields;

/**
 * FooFields Activation Class
 * Contains the activate method that runs on register_activation_hook
 */

if ( !class_exists( 'FooPlugins\FooFields\Activation' ) ) {

	class Activation {
		/**
		 * Fired when the plugin is activated.
		 *
		 * @param    boolean $network_wide       True if WPMU superadmin uses
		 *                                       "Network Activate" action, false if
		 *                                       WPMU is disabled or plugin is
		 *                                       activated on an individual blog.
		 */
		public static function activate( $network_wide ) {
			$plugin_data = get_site_option( FOOFIELDS_OPTION_DATA );
			$save_data     = false;
			if ( false === $plugin_data ) {
				$plugin_data = array(
					'version'       => FOOFIELDS_VERSION,
					'first_version' => FOOFIELDS_VERSION,
					'first_install' => time()
				);
				$save_data = true;
			} else {
				$version = $plugin_data['version'];

				if ( $version !== FOOFIELDS_VERSION ) {
					//the version has been updated

					$plugin_data['version'] = FOOFIELDS_VERSION;
					$save_data              = true;

					//store a transient for 1 min with the update info
					set_site_transient( FOOFIELDS_TRANSIENT_UPDATED, $plugin_data, 60 );
				}
			}

			if ( $save_data ) {
				update_site_option( FOOFIELDS_OPTION_DATA, $plugin_data );
			}

			if ( false === $network_wide ) {
				//make sure we redirect to the welcome wizard
				set_transient( FOOFIELDS_TRANSIENT_ACTIVATION_REDIRECT, true, 30 );
			}
		}
	}
}
