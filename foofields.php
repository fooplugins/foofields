<?php
/*
Plugin Name: FooFields
Description: A demo plugin to showcase how FooFields work
Version:     1.0.1
Author:      Brad Vincent
Author URI:  https://fooplugins.com
Text Domain: foofields
License:     GPL-2.0+
Domain Path: /languages

@fs_premium_only /includes/pro/

*/

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

//define some FooFields essentials
if ( !defined('FOOFIELDS_SLUG' ) ) {
	define( 'FOOFIELDS_SLUG', 'foofields' );
	define( 'FOOFIELDS_NAMESPACE', 'FooPlugins\FooFields' );
	define( 'FOOFIELDS_DIR', __DIR__ );
	define( 'FOOFIELDS_PATH', plugin_dir_path( __FILE__ ) );
	define( 'FOOFIELDS_URL', plugin_dir_url( __FILE__ ) );
	define( 'FOOFIELDS_FILE', __FILE__ );
	define( 'FOOFIELDS_VERSION', '1.0.1' );
	define( 'FOOFIELDS_MIN_PHP', '5.4.0' ); // Minimum of PHP 5.4 required for autoloading, namespaces, etc
	define( 'FOOFIELDS_MIN_WP', '4.4.0' );  // Minimum of WordPress 4.4 required
}

//include other essential FooFields constants
require_once( FOOFIELDS_PATH . 'includes/constants.php' );

//include common global FooFields functions
require_once( FOOFIELDS_PATH . 'includes/functions.php' );

//check minimum requirements before loading the plugin
if ( require_once FOOFIELDS_PATH . 'includes/startup-checks.php' ) {

	//start autoloader
	require_once( FOOFIELDS_PATH . 'vendor/autoload.php' );

	spl_autoload_register( 'foofields_autoloader' );

	//hook in activation
	register_activation_hook( __FILE__, array( 'FooPlugins\FooFields\Activation', 'activate' ) );

	//start the plugin!
	new FooPlugins\FooFields\Init();
}
