(function($, _){

	/**
	 * @summary The default configuration for the FooFields plugin.
	 * @memberof FooFields.
	 * @name config
	 * @type {FooFields~Config}
	 */
	_.config = {
		opt: {
			small: 960,
			on: {},
			fields: {}
		},
		cls: {
			small: "foofields-small",
			hoverable: "foofields-hoverable",
			active: "foofields-active",
			first: "foofields-first",
			last: "foofields-last",
			container: {
				el: "foofields-container",
				content: {
					el: "foofields-content",
					field: "foofields-field"
				},
				tabs: {
					el: "foofields-tabs",
					exists: "foofields-has-tabs",
					tab: {
						el: "foofields-tab",
						link: "foofields-tab-link",
						icon: "foofields-tab-icon",
						text: "foofields-tab-text",
						menu: {
							el: "foofields-tab-menu",
							exists: "foofields-has-menu",
							visible: "foofields-show-menu",
							header: "foofields-tab-menu-header",
							item: {
								el: "foofields-tab-menu-item",
								link: "foofields-tab-menu-link",
								text: "foofields-tab-menu-text"
							}
						}
					}
				}
			},
			fields: {}
		},
		i18n: {
			fields: {}
		}
	};

	/**
	 * @summary The global configuration object that can be included in the page.
	 * @memberof window.
	 * @name FOOFIELDS
	 * @type {FooFields~Config}
	 */

	/**
	 * @summary The options for the FooFields plugin.
	 * @typedef {Object} FooFields~Options
	 * @prop {number} small - The width in pixels below which the small screen view is displayed.
	 * @prop {Object} on - A map of event names to listeners to bind to the instance.
	 * @prop {Object} fields - An object containing the options for the various supported fields.
	 */

	/**
	 * @summary The CSS classes for the FooFields plugin.
	 * @typedef {Object} FooFields~Classes
	 * @prop {string} small - The CSS class that is applied to various elements when on a small screen.
	 * @prop {string} hoverable - The CSS class that is applied to various elements when hover is supported.
	 * @prop {string} active - The CSS class that is applied to various elements when they are active.
	 * @prop {string} first - The CSS class that is applied the first element within a list of elements.
	 * @prop {string} last - The CSS class that is applied the last element within a list of elements.
	 * @prop {Object} container
	 * @prop {string} container.el - The CSS class that is applied to a container element.
	 * @prop {Object} container.content
	 * @prop {string} container.content.el - The CSS class that is applied to a content element.
	 * @prop {string} container.content.field - The CSS class that is applied to all field elements.
	 * @prop {Object} container.tabs
	 * @prop {string} container.tabs.el - The CSS class that is applied to a tabs element.
	 * @prop {string} container.tabs.exists - The CSS class that is applied to the parent container element if it contains tabs.
	 * @prop {Object} container.tabs.tab
	 * @prop {string} container.tabs.tab.el - The CSS class that is applied to a tab element.
	 * @prop {string} container.tabs.tab.link - The CSS class that is applied to the link element within a tab.
	 * @prop {string} container.tabs.tab.icon - The CSS class that is applied to the icon element within a tab link.
	 * @prop {string} container.tabs.tab.text - The CSS class that is applied to the text element within a tab link.
	 * @prop {Object} container.tabs.tab.menu
	 * @prop {string} container.tabs.tab.menu.el - The CSS class that is applied to a tab menu element.
	 * @prop {string} container.tabs.tab.menu.exists - The CSS class that is applied to the parent tab element if it contains a menu.
	 * @prop {string} container.tabs.tab.menu.visible - The CSS class that is applied to the parent tab element when the menu is visible.
	 * @prop {string} container.tabs.tab.menu.header - The CSS class that is applied to a tab menu header element.
	 * @prop {Object} container.tabs.tab.menu.item
	 * @prop {string} container.tabs.tab.menu.item.el - The CSS class that is applied to a tab menu item element.
	 * @prop {string} container.tabs.tab.menu.item.link - The CSS class that is applied to the link element within a tab menu item.
	 * @prop {string} container.tabs.tab.menu.item.text - The CSS class that is applied to the text element within a tab menu item link.
	 * @prop {Object} fields - An object containing the CSS classes for the various supported fields.
	 */

	/**
	 * @summary The i18n for the FooFields plugin.
	 * @typedef {Object} FooFields~i18n
	 * @prop {Object} fields - An object containing the i18n for the various supported fields.
	 */

	/**
	 * @summary The configuration object used to initialize the FooFields plugin.
	 * @typedef {Object} FooFields~Config
	 * @prop {FooFields~Options} opt - The options for the plugin.
	 * @prop {FooFields~Classes} cls - The CSS classes for the plugin.
	 * @prop {FooFields~i18n} i18n - The i18n for the plugin.
	 */

	/**
	 * @summary A reference to the jQuery object the plugin is registered with.
	 * @memberof FooFields.
	 * @name $
	 * @type {jQuery}
	 * @description This is used internally for all jQuery operations to help work around issues where multiple jQuery libraries have been included in a single page.
	 * @example {@caption The following shows the issue when multiple jQuery's are included in a single page.}{@lang xml}
	 * <script src="jquery-1.12.4.js"></script>
	 * <script src="your-plugin.js"></script>
	 * <script src="jquery-2.2.4.js"></script>
	 * <script>
	 * 	jQuery(function($){
	 * 		$(".selector").yourPlugin(); // => This would throw a TypeError: $(...).yourPlugin is not a function
	 * 	});
	 * </script>
	 * @example {@caption The reason the above throws an error is that the `$.fn.yourPlugin` function is registered to the first instance of jQuery in the page however the instance used to create the ready callback and actually try to execute `$(...).yourPlugin()` is the second. To resolve this issue ideally you would remove the second instance of jQuery however you can use the `FooFields.$` member to ensure you are always working with the instance of jQuery the plugin was registered with.}{@lang xml}
	 * <script src="jquery-1.12.4.js"></script>
	 * <script src="your-plugin.js"></script>
	 * <script src="jquery-2.2.4.js"></script>
	 * <script>
	 * 	FooFields.$(function($){
	 * 		$(".selector").yourPlugin(); // => It works!
	 * 	});
	 * </script>
	 */
	_.$ = $;

})(
	// dependencies
	jQuery,
	/**
	 * @summary The core namespace for the plugin containing all its code.
	 * @global
	 * @namespace FooFields
	 * @description This plugin houses all it's code within a single `FooFields` global variable to prevent polluting the global namespace and to make accessing its various members simpler.
	 * @example {@caption As this namespace is registered as a global on the `window` object, it can be accessed using the `window.` prefix.}
	 * var fm = window.FooFields;
	 * @example {@caption Or without it.}
	 * var fm = FooFields;
	 * @example {@caption When using this namespace I would recommend aliasing it to a short variable name such as `fm` or as used internally `_`.}
	 * // alias the FooFields namespace
	 * var _ = FooFields;
	 * @example {@caption This is not required but lets us write less code and allows the alias to be minified by compressors like UglifyJS. How you choose to alias the namespace is up to you. You can use the simple `var` method as seen above or supply the namespace as a parameter when creating a new scope as seen below.}
	 * // create a new scope to work in passing the namespace as a parameter
	 * (function(_){
	 *
	 * 	// use `_.` to access members and methods
	 *
	 * })(FooFields);
	 */
	window.FooFields = window.FooFields || {}
);
/*!
* FooFields.utils - Contains common utility methods and classes used in our plugins.
* @version 0.1.9
* @link https://github.com/steveush/foo-utils#readme
* @copyright Steve Usher 2020
* @license Released under the GPL-3.0 license.
*/
/**
 * @file This creates the global FooFields.utils namespace ensuring it only registers itself if the namespace doesn't already exist or if the current version is lower than this one.
 */
(function ($) {

	if (!$){
		console.warn('jQuery must be included in the page prior to the FooFields.utils library.');
		return;
	}

	/**
	 * @summary This namespace contains common utility methods and code shared between our plugins.
	 * @namespace FooFields.utils
	 * @description This namespace relies on jQuery being included in the page prior to it being loaded.
	 */
	var utils = {
		/**
		 * @summary A reference to the jQuery object the library is registered with.
		 * @memberof FooFields.utils
		 * @name $
		 * @type {jQuery}
		 * @description This is used internally for all jQuery operations to help work around issues where multiple jQuery libraries have been included in a single page.
		 * @example {@caption The following shows the issue when multiple jQuery's are included in a single page.}{@lang html}
		 * <script src="jquery-1.12.4.js"></script>
		 * <script src="my-plugin.js"></script>
		 * <script src="jquery-2.2.4.js"></script>
		 * <script>
		 * 	jQuery(function($){
	 	 * 		$(".selector").myPlugin(); // => This would throw a TypeError: $(...).myPlugin is not a function
	 	 * 	});
		 * </script>
		 * @example {@caption The reason the above throws an error is that the `$.fn.myPlugin` function is registered to the first instance of jQuery in the page however the instance used to create the ready callback and actually try to execute `$(...).myPlugin()` is the second. To resolve this issue ideally you would remove the second instance of jQuery however you can use the `FooFields.utils.$` member to ensure you are always working with the instance of jQuery the library was registered with.}{@lang html}
		 * <script src="jquery-1.12.4.js"></script>
		 * <script src="my-plugin.js"></script>
		 * <script src="jquery-2.2.4.js"></script>
		 * <script>
		 * 	FooFields.utils.$(function($){
	 	 * 		$(".selector").myPlugin(); // => It works!
	 	 * 	});
		 * </script>
		 */
		$: $,
		/**
		 * @summary The version of this library.
		 * @memberof FooFields.utils
		 * @name version
		 * @type {string}
		 */
		version: '0.1.9'
	};

	/**
	 * @summary Compares two version numbers.
	 * @memberof FooFields.utils
	 * @function versionCompare
	 * @param {string} version1 - The first version to use in the comparison.
	 * @param {string} version2 - The second version to compare to the first.
	 * @returns {number} `0` if the version are equal.
	 * `-1` if `version1` is less than `version2`.
	 * `1` if `version1` is greater than `version2`.
	 * `NaN` if either of the supplied versions do not conform to MAJOR.MINOR.PATCH format.
	 * @description This method will compare two version numbers that conform to the basic MAJOR.MINOR.PATCH format returning the result as a simple number. This method will handle short version string comparisons e.g. `1.0` versus `1.0.1`.
	 * @example {@caption The following shows the results of comparing various version strings.}
	 * console.log( FooFields.utils.versionCompare( "0", "0" ) ); // => 0
	 * console.log( FooFields.utils.versionCompare( "0.0", "0" ) ); // => 0
	 * console.log( FooFields.utils.versionCompare( "0.0", "0.0.0" ) ); // => 0
	 * console.log( FooFields.utils.versionCompare( "0.1", "0.0.0" ) ); // => 1
	 * console.log( FooFields.utils.versionCompare( "0.1", "0.0.1" ) ); // => 1
	 * console.log( FooFields.utils.versionCompare( "1", "0.1" ) ); // => 1
	 * console.log( FooFields.utils.versionCompare( "1.10", "1.9" ) ); // => 1
	 * console.log( FooFields.utils.versionCompare( "1.9", "1.10" ) ); // => -1
	 * console.log( FooFields.utils.versionCompare( "1", "1.1" ) ); // => -1
	 * console.log( FooFields.utils.versionCompare( "1.0.9", "1.1" ) ); // => -1
	 * @example {@caption If either of the supplied version strings does not match the MAJOR.MINOR.PATCH format then `NaN` is returned.}
	 * console.log( FooFields.utils.versionCompare( "not-a-version", "1.1" ) ); // => NaN
	 * console.log( FooFields.utils.versionCompare( "1.1", "not-a-version" ) ); // => NaN
	 * console.log( FooFields.utils.versionCompare( "not-a-version", "not-a-version" ) ); // => NaN
	 */
	utils.versionCompare = function(version1, version2){
		// if either of the versions do not match the expected format return NaN
		if (!(/[\d.]/.test(version1) && /[\d.]/.test(version2))) return NaN;

		/**
		 * @summary Splits and parses the given version string into a numeric array.
		 * @param {string} version - The version string to split and parse.
		 * @returns {Array.<number>}
		 * @ignore
		 */
		function split(version){
			var parts = version.split('.'), result = [];
			for(var i = 0, len = parts.length; i < len; i++){
				result[i] = parseInt(parts[i]);
				if (isNaN(result[i])) result[i] = 0;
			}
			return result;
		}

		// get the base numeric arrays for each version
		var v1parts = split(version1),
			v2parts = split(version2);

		// ensure both arrays are the same length by padding the shorter with 0
		while (v1parts.length < v2parts.length) v1parts.push(0);
		while (v2parts.length < v1parts.length) v2parts.push(0);

		// perform the actual comparison
		for (var i = 0; i < v1parts.length; ++i) {
			if (v2parts.length === i) return 1;
			if (v1parts[i] === v2parts[i]) continue;
			if (v1parts[i] > v2parts[i]) return 1;
			else return -1;
		}
		if (v1parts.length !== v2parts.length) return -1;
		return 0;
	};

	function __exists(){
		try {
			return !!window.FooFields.utils; // does the namespace already exist?
		} catch(err) {
			return false;
		}
	}

	if (__exists()){
		// if it already exists always log a warning as there may be version conflicts as the following code always ensures the latest version is loaded
		if (utils.versionCompare(utils.version, window.FooFields.utils.version) > 0){
			// if it exists but it's an old version replace it
			console.warn("An older version of FooFields.utils (" + window.FooFields.utils.version + ") already exists in the page, version " + utils.version + " will override it.");
			window.FooFields.utils = utils;
		} else {
			// otherwise its a newer version so do nothing
			console.warn("A newer version of FooFields.utils (" + window.FooFields.utils.version + ") already exists in the page, version " + utils.version + " will not register itself.");
		}
	} else {
		// if it doesn't exist register it
		window.FooFields.utils = utils;
	}

	// at this point there will always be a FooFields.utils namespace registered to the global scope.

})(jQuery);
(function ($, _){
	// only register methods if this version is the current version
	if (_.version !== '0.1.9') return;

	/**
	 * @summary Contains common type checking utility methods.
	 * @memberof FooFields.utils
	 * @namespace is
	 */
	_.is = {};

	/**
	 * @summary Checks if the `value` is an array.
	 * @memberof FooFields.utils.is
	 * @function array
	 * @param {*} value - The value to check.
	 * @returns {boolean} `true` if the supplied `value` is an array.
	 * @example {@run true}
	 * // alias the FooFields.utils.is namespace
	 * var _is = FooFields.utils.is;
	 *
	 * console.log( _is.array( [] ) ); // => true
	 * console.log( _is.array( null ) ); // => false
	 * console.log( _is.array( 123 ) ); // => false
	 * console.log( _is.array( "" ) ); // => false
	 */
	_.is.array = function (value) {
		return '[object Array]' === Object.prototype.toString.call(value);
	};

	/**
	 * @summary Checks if the `value` is a boolean.
	 * @memberof FooFields.utils.is
	 * @function boolean
	 * @param {*} value - The value to check.
	 * @returns {boolean} `true` if the supplied `value` is a boolean.
	 * @example {@run true}
	 * // alias the FooFields.utils.is namespace
	 * var _is = FooFields.utils.is;
	 *
	 * console.log( _is.boolean( true ) ); // => true
	 * console.log( _is.boolean( false ) ); // => true
	 * console.log( _is.boolean( "true" ) ); // => false
	 * console.log( _is.boolean( "false" ) ); // => false
	 * console.log( _is.boolean( 1 ) ); // => false
	 * console.log( _is.boolean( 0 ) ); // => false
	 */
	_.is.boolean = function (value) {
		return '[object Boolean]' === Object.prototype.toString.call(value);
	};

	/**
	 * @summary Checks if the `value` is an element.
	 * @memberof FooFields.utils.is
	 * @function element
	 * @param {*} value - The value to check.
	 * @returns {boolean} `true` if the supplied `value` is an element.
	 * @example {@run true}
	 * // alias the FooFields.utils.is namespace
	 * var _is = FooFields.utils.is,
	 * 	// create an element to test
	 * 	el = document.createElement("span");
	 *
	 * console.log( _is.element( el ) ); // => true
	 * console.log( _is.element( $(el) ) ); // => false
	 * console.log( _is.element( null ) ); // => false
	 * console.log( _is.element( {} ) ); // => false
	 */
	_.is.element = function (value) {
		return typeof HTMLElement === 'object'
			? value instanceof HTMLElement
			: !!value && typeof value === 'object' && value.nodeType === 1 && typeof value.nodeName === 'string';
	};

	/**
	 * @summary Checks if the `value` is empty.
	 * @memberof FooFields.utils.is
	 * @function empty
	 * @param {*} value - The value to check.
	 * @returns {boolean} `true` if the supplied `value` is empty.
	 * @description The following values are considered to be empty by this method:
	 *
	 * <ul><!--
	 * --><li>`""`			- An empty string</li><!--
	 * --><li>`0`			- 0 as an integer</li><!--
	 * --><li>`0.0`		- 0 as a float</li><!--
	 * --><li>`[]`			- An empty array</li><!--
	 * --><li>`{}`			- An empty object</li><!--
	 * --><li>`$()`		- An empty jQuery object</li><!--
	 * --><li>`false`</li><!--
	 * --><li>`null`</li><!--
	 * --><li>`undefined`</li><!--
	 * --></ul>
	 * @example {@run true}
	 * // alias the FooFields.utils.is namespace
	 * var _is = FooFields.utils.is;
	 *
	 * console.log( _is.empty( undefined ) ); // => true
	 * console.log( _is.empty( null ) ); // => true
	 * console.log( _is.empty( 0 ) ); // => true
	 * console.log( _is.empty( 0.0 ) ); // => true
	 * console.log( _is.empty( "" ) ); // => true
	 * console.log( _is.empty( [] ) ); // => true
	 * console.log( _is.empty( {} ) ); // => true
	 * console.log( _is.empty( 1 ) ); // => false
	 * console.log( _is.empty( 0.1 ) ); // => false
	 * console.log( _is.empty( "one" ) ); // => false
	 * console.log( _is.empty( ["one"] ) ); // => false
	 * console.log( _is.empty( { "name": "My Object" } ) ); // => false
	 */
	_.is.empty = function(value){
		if (_.is.undef(value) || value === null) return true;
		if (_.is.number(value) && value === 0) return true;
		if (_.is.boolean(value) && value === false) return true;
		if (_.is.string(value) && value.length === 0) return true;
		if (_.is.array(value) && value.length === 0) return true;
		if (_.is.jq(value) && value.length === 0) return true;
		if (_.is.hash(value)){
			for(var prop in value) {
				if(value.hasOwnProperty(prop))
					return false;
			}
			return true;
		}
		return false;
	};

	/**
	 * @summary Checks if the `value` is an error.
	 * @memberof FooFields.utils.is
	 * @function error
	 * @param {*} value - The value to check.
	 * @returns {boolean} `true` if the supplied `value` is an error.
	 * @example {@run true}
	 * // alias the FooFields.utils.is namespace
	 * var _is = FooFields.utils.is,
	 * 	// create some errors to test
	 * 	err1 = new Error("err1"),
	 * 	err2 = new SyntaxError("err2");
	 *
	 * console.log( _is.error( err1 ) ); // => true
	 * console.log( _is.error( err2 ) ); // => true
	 * console.log( _is.error( null ) ); // => false
	 * console.log( _is.error( 123 ) ); // => false
	 * console.log( _is.error( "" ) ); // => false
	 * console.log( _is.error( {} ) ); // => false
	 * console.log( _is.error( [] ) ); // => false
	 */
	_.is.error = function (value) {
		return '[object Error]' === Object.prototype.toString.call(value);
	};

	/**
	 * @summary Checks if the `value` is a function.
	 * @memberof FooFields.utils.is
	 * @function fn
	 * @param {*} value - The value to check.
	 * @returns {boolean} `true` if the supplied `value` is a function.
	 * @example {@run true}
	 * // alias the FooFields.utils.is namespace
	 * var _is = FooFields.utils.is,
	 * 	// create a function to test
	 * 	func = function(){};
	 *
	 * console.log( _is.fn( func ) ); // => true
	 * console.log( _is.fn( null ) ); // => false
	 * console.log( _is.fn( 123 ) ); // => false
	 * console.log( _is.fn( "" ) ); // => false
	 */
	_.is.fn = function (value) {
		return value === window.alert || '[object Function]' === Object.prototype.toString.call(value);
	};

	/**
	 * @summary Checks if the `value` is a hash.
	 * @memberof FooFields.utils.is
	 * @function hash
	 * @param {*} value - The value to check.
	 * @returns {boolean} `true` if the supplied `value` is a hash.
	 * @example {@run true}
	 * // alias the FooFields.utils.is namespace
	 * var _is = FooFields.utils.is;
	 *
	 * console.log( _is.hash( {"some": "prop"} ) ); // => true
	 * console.log( _is.hash( {} ) ); // => true
	 * console.log( _is.hash( window ) ); // => false
	 * console.log( _is.hash( document ) ); // => false
	 * console.log( _is.hash( "" ) ); // => false
	 * console.log( _is.hash( 123 ) ); // => false
	 */
	_.is.hash = function (value) {
		return _.is.object(value) && value.constructor === Object && !value.nodeType && !value.setInterval;
	};

	/**
	 * @summary Checks if the `value` is a jQuery object.
	 * @memberof FooFields.utils.is
	 * @function jq
	 * @param {*} value - The value to check.
	 * @returns {boolean} `true` if the supplied `value` is a jQuery object.
	 * @example {@run true}
	 * // alias the FooFields.utils.is namespace
	 * var _is = FooFields.utils.is,
	 * 	// create an element to test
	 * 	el = document.createElement("span");
	 *
	 * console.log( _is.jq( $(el) ) ); // => true
	 * console.log( _is.jq( $() ) ); // => true
	 * console.log( _is.jq( el ) ); // => false
	 * console.log( _is.jq( {} ) ); // => false
	 * console.log( _is.jq( null ) ); // => false
	 * console.log( _is.jq( 123 ) ); // => false
	 * console.log( _is.jq( "" ) ); // => false
	 */
	_.is.jq = function(value){
		return !_.is.undef($) && value instanceof $;
	};

	/**
	 * @summary Checks if the `value` is a number.
	 * @memberof FooFields.utils.is
	 * @function number
	 * @param {*} value - The value to check.
	 * @returns {boolean}
	 * @example {@run true}
	 * // alias the FooFields.utils.is namespace
	 * var _is = FooFields.utils.is;
	 *
	 * console.log( _is.number( 123 ) ); // => true
	 * console.log( _is.number( undefined ) ); // => false
	 * console.log( _is.number( null ) ); // => false
	 * console.log( _is.number( "" ) ); // => false
	 */
	_.is.number = function (value) {
		return '[object Number]' === Object.prototype.toString.call(value) && !isNaN(value);
	};

	/**
	 * @summary Checks if the `value` is an object.
	 * @memberof FooFields.utils.is
	 * @function object
	 * @param {*} value - The value to check.
	 * @returns {boolean} `true` if the supplied `value` is an object.
	 * @example {@run true}
	 * // alias the FooFields.utils.is namespace
	 * var _is = FooFields.utils.is;
	 *
	 * console.log( _is.object( {"some": "prop"} ) ); // => true
	 * console.log( _is.object( {} ) ); // => true
	 * console.log( _is.object( window ) ); // => true
	 * console.log( _is.object( document ) ); // => true
	 * console.log( _is.object( undefined ) ); // => false
	 * console.log( _is.object( null ) ); // => false
	 * console.log( _is.object( "" ) ); // => false
	 * console.log( _is.object( 123 ) ); // => false
	 */
	_.is.object = function (value) {
		return '[object Object]' === Object.prototype.toString.call(value) && !_.is.undef(value) && value !== null;
	};

	/**
	 * @summary Checks if the `value` is a promise.
	 * @memberof FooFields.utils.is
	 * @function promise
	 * @param {*} value - The object to check.
	 * @returns {boolean} `true` if the supplied `value` is an object.
	 * @description This is a simple check to determine if an object is a jQuery promise object. It simply checks the object has a `then` and `promise` function defined.
	 *
	 * The promise object is created as an object literal inside of `jQuery.Deferred`, it has no prototype, nor any other truly unique properties that could be used to distinguish it.
	 *
	 * This method should be a little more accurate than the internal jQuery one that simply checks for a `promise` function.
	 * @example {@run true}
	 * // alias the FooFields.utils.is namespace
	 * var _is = FooFields.utils.is;
	 *
	 * console.log( _is.promise( $.Deferred() ) ); // => true
	 * console.log( _is.promise( {} ) ); // => false
	 * console.log( _is.promise( undefined ) ); // => false
	 * console.log( _is.promise( null ) ); // => false
	 * console.log( _is.promise( "" ) ); // => false
	 * console.log( _is.promise( 123 ) ); // => false
	 */
	_.is.promise = function(value){
		return _.is.object(value) && _.is.fn(value.then) && _.is.fn(value.promise);
	};

	/**
	 * @summary Checks if the `value` is a valid CSS length.
	 * @memberof FooFields.utils.is
	 * @function size
	 * @param {*} value - The value to check.
	 * @returns {boolean} `true` if the `value` is a number or CSS length.
	 * @example {@run true}
	 * // alias the FooFields.utils.is namespace
	 * var _is = FooFields.utils.is;
	 *
	 * console.log( _is.size( 80 ) ); // => true
	 * console.log( _is.size( "80px" ) ); // => true
	 * console.log( _is.size( "80em" ) ); // => true
	 * console.log( _is.size( "80%" ) ); // => true
	 * console.log( _is.size( {} ) ); // => false
	 * console.log( _is.size( undefined ) ); // => false
	 * console.log( _is.size( null ) ); // => false
	 * console.log( _is.size( "" ) ); // => false
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/length|&lt;length&gt; - CSS | MDN} for more information on CSS length values.
	 */
	_.is.size = function(value){
		if (!(_.is.string(value) && !_.is.empty(value)) && !_.is.number(value)) return false;
		return /^(auto|none|(?:[\d.]*)+?(?:%|px|mm|q|cm|in|pt|pc|em|ex|ch|rem|vh|vw|vmin|vmax)?)$/.test(value);
	};

	/**
	 * @summary Checks if the `value` is a string.
	 * @memberof FooFields.utils.is
	 * @function string
	 * @param {*} value - The value to check.
	 * @returns {boolean} `true` if the `value` is a string.
	 * @example {@run true}
	 * // alias the FooFields.utils.is namespace
	 * var _is = FooFields.utils.is;
	 *
	 * console.log( _is.string( "" ) ); // => true
	 * console.log( _is.string( undefined ) ); // => false
	 * console.log( _is.string( null ) ); // => false
	 * console.log( _is.string( 123 ) ); // => false
	 */
	_.is.string = function (value) {
		return '[object String]' === Object.prototype.toString.call(value);
	};

	/**
	 * @summary Checks if the `value` is `undefined`.
	 * @memberof FooFields.utils.is
	 * @function undef
	 * @param {*} value - The value to check is undefined.
	 * @returns {boolean} `true` if the supplied `value` is `undefined`.
	 * @example {@run true}
	 * // alias the FooFields.utils.is namespace
	 * var _is = FooFields.utils.is;
	 *
	 * console.log( _is.undef( undefined ) ); // => true
	 * console.log( _is.undef( null ) ); // => false
	 * console.log( _is.undef( 123 ) ); // => false
	 * console.log( _is.undef( "" ) ); // => false
	 */
	_.is.undef = function (value) {
		return typeof value === 'undefined';
	};

})(
	// dependencies
	FooFields.utils.$,
	FooFields.utils
);
(function($, _, _is){
	// only register methods if this version is the current version
	if (_.version !== '0.1.9') return;

	/**
	 * @memberof FooFields.utils
	 * @namespace fn
	 * @summary Contains common function utility methods.
	 */
	_.fn = {};

	var fnStr = Function.prototype.toString;

	/**
	 * @summary The regular expression to test if a function uses the `this._super` method applied by the {@link FooFields.utils.fn.add} method.
	 * @memberof FooFields.utils.fn
	 * @name CONTAINS_SUPER
	 * @type {RegExp}
	 * @default /\b_super\b/
	 * @readonly
	 * @description When the script is first loaded into the page this performs a quick check to see if the browser supports function decompilation. If it does the regular expression is set to match the expected `_super`, however if  function decompilation is not supported, the regular expression is set to match anything effectively making the test always return `true`.
	 * @example {@run true}
	 * // alias the FooFields.utils.fn namespace
	 * var _fn = FooFields.utils.fn;
	 *
	 * // create some functions to test
	 * function testFn1(){}
	 * function testFn2(){
	 * 	this._super();
	 * }
	 *
	 * console.log( _fn.CONTAINS_SUPER.test( testFn1 ) ); // => false
	 * console.log( _fn.CONTAINS_SUPER.test( testFn2 ) ); // => true
	 *
	 * // NOTE: in browsers that don't support functional decompilation both tests will return `true`
	 */
	_.fn.CONTAINS_SUPER = /xyz/.test(fnStr.call(function(){
		//noinspection JSUnresolvedVariable,BadExpressionStatementJS
		xyz;
	})) ? /\b_super\b/ : /.*/;

	/**
	 * @summary Adds or overrides the given method `name` on the `proto` using the supplied `fn`.
	 * @memberof FooFields.utils.fn
	 * @function addOrOverride
	 * @param {Object} proto - The prototype to add the method to.
	 * @param {string} name - The name of the method to add, if this already exists the original will be exposed within the scope of the supplied `fn` as `this._super`.
	 * @param {function} fn - The function to add to the prototype, if this is overriding an existing method you can use `this._super` to access the original within its' scope.
	 * @description If the new method overrides a pre-existing one, this function will expose the overridden method as `this._super` within the new methods scope.
	 *
	 * This replaces having to write out the following to override a method and call its original:
	 *
	 * ```javascript
	 * var original = MyClass.prototype.someMethod;
	 * MyClass.prototype.someMethod = function(arg1, arg2){
	 * 	// execute the original
	 * 	original.call(this, arg1, arg2);
	 * };
	 * ```
	 *
	 * With the following:
	 *
	 * ```javascript
	 * FooFields.utils.fn.addOrOverride( MyClass.prototype, "someMethod", function(arg1, arg2){
	 * 	// execute the original
	 * 	this._super(arg1, arg2);
	 * });
	 * ```
	 *
	 * This method is used by the {@link FooFields.utils.Class} to implement the inheritance of individual methods.
	 * @example {@run true}
	 * // alias the FooFields.utils.fn namespace
	 * var _fn = FooFields.utils.fn;
	 *
	 * var proto = {
	 * 	write: function( message ){
	 * 		console.log( "Original#write: " + message );
	 * 	}
	 * };
	 *
	 * proto.write( "My message" ); // => "Original#write: My message"
	 *
	 * _fn.addOrOverride( proto, "write", function( message ){
	 * 	message = "Override#write: " + message;
	 * 	this._super( message );
	 * } );
	 *
	 * proto.write( "My message" ); // => "Original#write: Override#write: My message"
	 */
	_.fn.addOrOverride = function(proto, name, fn){
		if (!_is.object(proto) || !_is.string(name) || _is.empty(name) || !_is.fn(fn)) return;
		var _super = proto[name],
			wrap = _is.fn(_super) && _.fn.CONTAINS_SUPER.test(fnStr.call(fn));
		// only wrap the function if it overrides a method and makes use of `_super` within it's body.
		proto[name] = wrap ?
			(function (_super, fn) {
				// create a new wrapped that exposes the original method as `_super`
				return function () {
					var tmp = this._super;
					this._super = _super;
					var ret = fn.apply(this, arguments);
					this._super = tmp;
					return ret;
				};
			})(_super, fn) : fn;
	};

	/**
	 * @summary Use the `Function.prototype.apply` method on a class constructor using the `new` keyword.
	 * @memberof FooFields.utils.fn
	 * @function apply
	 * @param {Object} klass - The class to create.
	 * @param {Array} [args=[]] - The arguments to pass to the constructor.
	 * @returns {function} The new instance of the `klass` created with the supplied `args`.
	 * @description When using the default `Function.prototype.apply` you can't use it on class constructors requiring the `new` keyword, this method allows us to do that.
	 * @example {@run true}
	 * // alias the FooFields.utils.fn namespace
	 * var _fn = FooFields.utils.fn;
	 *
	 * // create a class to test with
	 * function Test( name, value ){
	 * 	if ( !( this instanceof Test )){
	 * 		console.log( "Test instantiated without the `new` keyword." );
	 * 		return;
	 * 	}
	 * 	console.log( "Test: name = " + name + ", value = " + value );
	 * }
	 *
	 * Test.apply( Test, ["My name", "My value"] ); // => "Test instantiated without the `new` keyword."
	 * _fn.apply( Test, ["My name", "My value"] ); // => "Test: name = My name, value = My value"
	 */
	_.fn.apply = function(klass, args){
		args = _is.array(args) ? args : [];
		function Class() {
			return klass.apply(this, args);
		}
		Class.prototype = klass.prototype;
		//noinspection JSValidateTypes
		return new Class();
	};

	/**
	 * @summary Converts the default `arguments` object into a proper array.
	 * @memberof FooFields.utils.fn
	 * @function arg2arr
	 * @param {Arguments} args - The arguments object to create an array from.
	 * @returns {Array}
	 * @description This method is simply a replacement for calling `Array.prototype.slice.call()` to create an array from an `arguments` object.
	 * @example {@run true}
	 * // alias the FooFields.utils.fn namespace
	 * var _fn = FooFields.utils.fn;
	 *
	 * function callMe(){
	 * 	var args = _fn.arg2arr(arguments);
	 * 	console.log( arguments instanceof Array ); // => false
	 * 	console.log( args instanceof Array ); // => true
	 * 	console.log( args ); // => [ "arg1", "arg2" ]
	 * }
	 *
	 * callMe("arg1", "arg2");
	 */
	_.fn.arg2arr = function(args){
		return Array.prototype.slice.call(args);
	};

	/**
	 * @summary Debounces the `fn` by the supplied `time`.
	 * @memberof FooFields.utils.fn
	 * @function debounce
	 * @param {function} fn - The function to debounce.
	 * @param {number} time - The time in milliseconds to delay execution.
	 * @returns {function}
	 * @description This returns a wrapped version of the `fn` which delays its' execution by the supplied `time`. Additional calls to the function will extend the delay until the `time` expires.
	 */
	_.fn.debounce = function (fn, time) {
		var timeout;
		return function () {
			var ctx = this, args = _.fn.arg2arr(arguments);
			clearTimeout(timeout);
			timeout = setTimeout(function () {
				fn.apply(ctx, args);
			}, time);
		};
	};

	/**
	 * @summary Throttles the `fn` by the supplied `time`.
	 * @memberof FooFields.utils.fn
	 * @function throttle
	 * @param {function} fn - The function to throttle.
	 * @param {number} time - The time in milliseconds to delay execution.
	 * @returns {function}
	 * @description This returns a wrapped version of the `fn` which ensures it's executed only once every `time` milliseconds. The first call to the function will be executed, after that only the last of any additional calls will be executed once the `time` expires.
	 */
	_.fn.throttle = function (fn, time) {
		var last, timeout;
		return function () {
			var ctx = this, args = _.fn.arg2arr(arguments);
			if (!last){
				fn.apply(ctx, args);
				last = Date.now();
			} else {
				clearTimeout(timeout);
				timeout = setTimeout(function () {
					if (Date.now() - last >= time) {
						fn.apply(ctx, args);
						last = Date.now();
					}
				}, time - (Date.now() - last));
			}
		}
	};

	/**
	 * @summary Checks the given `value` and ensures a function is returned.
	 * @memberof FooFields.utils.fn
	 * @function check
	 * @param {?Object} thisArg=window - The `this` keyword within the returned function, if the supplied value is not an object this defaults to the `window`.
	 * @param {*} value - The value to check, if not a function or the name of one then the `def` value is automatically returned.
	 * @param {function} [def=jQuery.noop] - A default function to use if the `value` is not resolved to a function.
	 * @param {Object} [ctx=window] - If the `value` is a string this is supplied to the {@link FooFields.utils.fn.fetch} method as the content to retrieve the function from.
	 * @returns {function} A function that ensures the correct context is applied when executed.
	 * @description This function is primarily used to check the value of a callback option that could be supplied as either a function or a string.
	 *
	 * When just the function name is supplied this method uses the {@link FooFields.utils.fn.fetch} method to resolve and wrap it to ensure when it's called the correct context is applied.
	 *
	 * Being able to resolve a function from a name allows callbacks to be easily set even through data attributes as you can just supply the full function name as a string and then use this method to retrieve the actual function.
	 * @example {@run true}
	 * // alias the FooFields.utils.fn namespace
	 * var _fn = FooFields.utils.fn;
	 *
	 * // a simple `api` with a `sendMessage` function
	 * window.api = {
	 * 	sendMessage: function(){
	 * 		this.write( "window.api.sendMessage" );
	 * 	},
	 * 	child: {
	 * 		api: {
	 * 			sendMessage: function(){
	 * 				this.write( "window.api.child.api.sendMessage" );
	 * 			}
	 * 		}
	 * 	}
	 * };
	 *
	 * // a default function to use in case the check fails
	 * var def = function(){
	 * 	this.write( "default" );
	 * };
	 *
	 * // an object to use as the `this` object within the scope of the checked functions
	 * var thisArg = {
	 * 	write: function( message ){
	 * 		console.log( message );
	 * 	}
	 * };
	 *
	 * // check the value and return a wrapped function ensuring the correct context.
	 * var fn = _fn.check( thisArg, null, def );
	 * fn(); // => "default"
	 *
	 * fn = _fn.check( thisArg, "api.doesNotExist", def );
	 * fn(); // => "default"
	 *
	 * fn = _fn.check( thisArg, api.sendMessage, def );
	 * fn(); // => "window.api.sendMessage"
	 *
	 * fn = _fn.check( thisArg, "api.sendMessage", def );
	 * fn(); // => "window.api.sendMessage"
	 *
	 * fn = _fn.check( thisArg, "api.sendMessage", def, window.api.child );
	 * fn(); // => "window.api.child.api.sendMessage"
	 */
	_.fn.check = function(thisArg, value, def, ctx){
		def = _is.fn(def) ? def : $.noop;
		thisArg = _is.object(thisArg) ? thisArg : window;
		function wrap(fn){
			return function(){
				return fn.apply(thisArg, arguments);
			};
		}
		value = _is.string(value) ? _.fn.fetch(value, ctx) : value;
		return _is.fn(value) ? wrap(value) : wrap(def);
	};

	/**
	 * @summary Fetches a function given its `name`.
	 * @memberof FooFields.utils.fn
	 * @function fetch
	 * @param {string} name - The name of the function to fetch. This can be a `.` notated name.
	 * @param {Object} [ctx=window] - The context to retrieve the function from, defaults to the `window` object.
	 * @returns {?function} `null` if a function with the given name is not found within the context.
	 * @example {@run true}
	 * // alias the FooFields.utils.fn namespace
	 * var _fn = FooFields.utils.fn;
	 *
	 * // create a dummy `api` with a `sendMessage` function to test
	 * window.api = {
	 * 	sendMessage: function( message ){
	 * 		console.log( "api.sendMessage: " + message );
	 * 	}
	 * };
	 *
	 * // the below shows 3 different ways to fetch the `sendMessage` function
	 * var send1 = _fn.fetch( "api.sendMessage" );
	 * var send2 = _fn.fetch( "api.sendMessage", window );
	 * var send3 = _fn.fetch( "sendMessage", window.api );
	 *
	 * // all the retrieved methods should be the same
	 * console.log( send1 === send2 && send2 === send3 ); // => true
	 *
	 * // check if the function was found
	 * if ( send1 != null ){
	 * 	send1( "My message" ); // => "api.sendMessage: My message"
	 * }
	 */
	_.fn.fetch = function(name, ctx){
		if (!_is.string(name) || _is.empty(name)) return null;
		ctx = _is.object(ctx) ? ctx : window;
		$.each(name.split('.'), function(i, part){
			if (ctx[part]) ctx = ctx[part];
			else return false;
		});
		return _is.fn(ctx) ? ctx : null;
	};

	/**
	 * @summary Enqueues methods using the given `name` from all supplied `objects` and executes each in order with the given arguments.
	 * @memberof FooFields.utils.fn
	 * @function enqueue
	 * @param {Array.<Object>} objects - The objects to call the method on.
	 * @param {string} name - The name of the method to execute.
	 * @param {*} [arg1] - The first argument to call the method with.
	 * @param {...*} [argN] - Any additional arguments for the method.
	 * @returns {Promise} If `resolved` the first argument supplied to any success callbacks is an array of all returned value(s). These values are encapsulated within their own array as if the method returned a promise it could be resolved with more than one argument.
	 *
	 * If `rejected` any fail callbacks are supplied the arguments the promise was rejected with plus an additional one appended by this method, an array of all objects that have already had their methods run. This allows you to perform rollback operations if required after a failure. The last object in this array would contain the method that raised the error.
	 * @description This method allows an array of `objects` that implement a common set of methods to be executed in a supplied order. Each method in the queue is only executed after the successful completion of the previous. Success is evaluated as the method did not throw an error and if it returned a promise it was resolved.
	 *
	 * An example of this being used within the plugin is the loading and execution of methods on the various components. Using this method ensures components are loaded and have their methods executed in a static order regardless of when they were registered with the plugin or if the method is async. This way if `ComponentB`'s `preinit` relies on properties set in `ComponentA`'s `preinit` method you can register `ComponentB` with a lower priority than `ComponentA` and you can be assured `ComponentA`'s `preinit` completed successfully before `ComponentB`'s `preinit` is called event if it performs an async operation.
	 * @example {@caption Shows a basic example of how you can use this method.}{@run true}
	 * // alias the FooFields.utils.fn namespace
	 * var _fn = FooFields.utils.fn;
	 *
	 * // create some dummy objects that implement the same members or methods.
	 * var obj1 = {
	 * 	"name": "obj1",
	 * 	"appendName": function(str){
	 * 		console.log( "Executing obj1.appendName..." );
	 * 		return str + this.name;
	 * 	}
	 * };
	 *
	 * // this objects `appendName` method returns a promise
	 * var obj2 = {
	 * 	"name": "obj2",
	 * 	"appendName": function(str){
	 * 		console.log( "Executing obj2.appendName..." );
	 * 		var self = this;
	 * 		return $.Deferred(function(def){
	 *			// use a setTimeout to delay execution
	 *			setTimeout(function(){
	 *					def.resolve(str + self.name);
	 *			}, 300);
	 * 		});
	 * 	}
	 * };
	 *
	 * // this objects `appendName` method is only executed once obj2's promise is resolved
	 * var obj3 = {
	 * 	"name": "obj3",
	 * 	"appendName": function(str){
	 * 		console.log( "Executing obj3.appendName..." );
	 * 		return str + this.name;
	 * 	}
	 * };
	 *
	 * _fn.enqueue( [obj1, obj2, obj3], "appendName", "modified_by:" ).then(function(results){
	 * 	console.log( results ); // => [ [ "modified_by:obj1" ], [ "modified_by:obj2" ], [ "modified_by:obj3" ] ]
	 * });
	 * @example {@caption If an error is thrown by one of the called methods or it returns a promise that is rejected, execution is halted and any fail callbacks are executed. The last argument is an array of objects that have had their methods run, the last object within this array is the one that raised the error.}{@run true}
	 * // alias the FooFields.utils.fn namespace
	 * var _fn = FooFields.utils.fn;
	 *
	 * // create some dummy objects that implement the same members or methods.
	 * var obj1 = {
	 * 	"name": "obj1",
	 * 	"last": null,
	 * 	"appendName": function(str){
	 * 		console.log( "Executing obj1.appendName..." );
	 * 		return this.last = str + this.name;
	 * 	},
	 * 	"rollback": function(){
	 * 		console.log( "Executing obj1.rollback..." );
	 * 		this.last = null;
	 * 	}
	 * };
	 *
	 * // this objects `appendName` method throws an error
	 * var obj2 = {
	 * 	"name": "obj2",
	 * 	"last": null,
	 * 	"appendName": function(str){
	 * 		console.log( "Executing obj2.appendName..." );
	 * 		//throw new Error("Oops, something broke.");
	 * 		var self = this;
	 * 		return $.Deferred(function(def){
	 *			// use a setTimeout to delay execution
	 *			setTimeout(function(){
	 *					self.last = str + self.name;
	 *					def.reject(Error("Oops, something broke."));
	 *			}, 300);
	 * 		});
	 * 	},
	 * 	"rollback": function(){
	 * 		console.log( "Executing obj2.rollback..." );
	 * 		this.last = null;
	 * 	}
	 * };
	 *
	 * // this objects `appendName` and `rollback` methods are never executed
	 * var obj3 = {
	 * 	"name": "obj3",
	 * 	"last": null,
	 * 	"appendName": function(str){
	 * 		console.log( "Executing obj3.appendName..." );
	 * 		return this.last = str + this.name;
	 * 	},
	 * 	"rollback": function(){
	 * 		console.log( "Executing obj3.rollback..." );
	 * 		this.last = null;
	 * 	}
	 * };
	 *
	 * _fn.enqueue( [obj1, obj2, obj3], "appendName", "modified_by:" ).fail(function(err, run){
	 * 	console.log( err.message ); // => "Oops, something broke."
	 * 	console.log( run ); // => [ {"name":"obj1","last":"modified_by:obj1"}, {"name":"obj2","last":"modified_by:obj2"} ]
	 * 	var guilty = run[run.length - 1];
	 * 	console.log( "Error thrown by: " + guilty.name ); // => "obj2"
	 * 	run.reverse(); // reverse execution when rolling back to avoid dependency issues
	 * 	return _fn.enqueue( run, "rollback" ).then(function(){
	 * 		console.log( "Error handled and rollback performed." );
	 * 		console.log( run ); // => [ {"name":"obj1","last":null}, {"name":"obj2","last":null} ]
	 * 	});
	 * });
	 */
	_.fn.enqueue = function(objects, name, arg1, argN){
		var args = _.fn.arg2arr(arguments), // get an array of all supplied arguments
			def = $.Deferred(), // the main deferred object for the function
			queue = $.Deferred(), // the deferred object to use as an queue
			promise = queue.promise(), // used to register component methods for execution
			results = [], // stores the results of each method to be returned by the main deferred
			run = [], // stores each object once its' method has been run
			first = true; // whether or not this is the first resolve callback

		// take the objects and name parameters out of the args array
		objects = args.shift();
		name = args.shift();

		// safely execute a function, catch any errors and reject the deferred if required.
		function safe(obj, method){
			try {
				run.push(obj);
				return method.apply(obj, args);
			} catch(err) {
				def.reject(err, run);
				return def;
			}
		}

		// loop through all the supplied objects
		$.each(objects, function(i, obj){
			// if the obj has a function with the supplied name
			if (_is.fn(obj[name])){
				// then register the method in the callback queue
				promise = promise.then(function(){
					// only register the result if this is not the first resolve callback, the first is triggered by this function kicking off the queue
					if (!first){
						var resolveArgs = _.fn.arg2arr(arguments);
						results.push(resolveArgs);
					}
					first = false;
					// execute the method and return it's result, if the result is a promise
					// the next method will only be executed once it's resolved
					return safe(obj, obj[name]);
				});
			}
		});

		// add one last callback to catch the final result
		promise.then(function(){
			// only register the result if this is not the first resolve callback
			if (!first){
				var resolveArgs = _.fn.arg2arr(arguments);
				results.push(resolveArgs);
			}
			first = false;
			// resolve the main deferred with the array of all the method results
			def.resolve(results);
		});

		// hook into failures and ensure the run array is appended to the args
		promise.fail(function(){
			var rejectArgs = _.fn.arg2arr(arguments);
			rejectArgs.push(run);
			def.reject.apply(def, rejectArgs);
		});

		// kick off the queue
		queue.resolve();

		return def.promise();
	};

	/**
	 * @summary Waits for the outcome of all promises regardless of failure and resolves supplying the results of just those that succeeded.
	 * @memberof FooFields.utils.fn
	 * @function when
	 * @param {Promise[]} promises - The array of promises to wait for.
	 * @returns {Promise}
	 */
	_.fn.when = function(promises){
		if (!_is.array(promises) || _is.empty(promises)) return $.when();
		var d = $.Deferred(), results = [], remaining = promises.length;
		for(var i = 0; i < promises.length; i++){
			promises[i].then(function(res){
				results.push(res); // on success, add to results
			}).always(function(){
				remaining--; // always mark as finished
				if(!remaining) d.resolve(results);
			})
		}
		return d.promise(); // return a promise on the remaining values
	};

	/**
	 * @summary Return a promise rejected using the supplied args.
	 * @memberof FooFields.utils.fn
	 * @function rejectWith
	 * @param {*} [arg1] - The first argument to reject the promise with.
	 * @param {...*} [argN] - Any additional arguments to reject the promise with.
	 * @returns {Promise}
	 */
	_.fn.rejectWith = function(arg1, argN){
		var def = $.Deferred(), args = _.fn.arg2arr(arguments);
		return def.reject.apply(def, args).promise();
	};

	/**
	 * @summary Return a promise resolved using the supplied args.
	 * @memberof FooFields.utils.fn
	 * @function resolveWith
	 * @param {*} [arg1] - The first argument to resolve the promise with.
	 * @param {...*} [argN] - Any additional arguments to resolve the promise with.
	 * @returns {Promise}
	 */
	_.fn.resolveWith = function(arg1, argN){
		var def = $.Deferred(), args = _.fn.arg2arr(arguments);
		return def.resolve.apply(def, args).promise();
	};

	/**
	 * @summary A resolved promise object.
	 * @memberof FooFields.utils.fn
	 * @name resolved
	 * @type {Promise}
	 */
	_.fn.resolved = $.Deferred().resolve().promise();

	/**
	 * @summary A rejected promise object.
	 * @memberof FooFields.utils.fn
	 * @name resolved
	 * @type {Promise}
	 */
	_.fn.rejected = $.Deferred().reject().promise();

})(
	// dependencies
	FooFields.utils.$,
	FooFields.utils,
	FooFields.utils.is
);
(function(_, _is){
	// only register methods if this version is the current version
	if (_.version !== '0.1.9') return;

	/**
	 * @summary Contains common url utility methods.
	 * @memberof FooFields.utils
	 * @namespace url
	 */
	_.url = {};

	// used for parsing a url into it's parts.
	var _a = document.createElement('a');

	/**
	 * @summary Parses the supplied url into an object containing it's component parts.
	 * @memberof FooFields.utils.url
	 * @function parts
	 * @param {string} url - The url to parse.
	 * @returns {FooFields.utils.url~Parts}
	 * @example {@run true}
	 * // alias the FooFields.utils.url namespace
	 * var _url = FooFields.utils.url;
	 *
	 * console.log( _url.parts( "http://example.com/path/?param=true#something" ) ); // => {"hash":"#something", ...}
	 */
	_.url.parts = function(url){
		_a.href = url;
		var port = _a.port ? _a.port : (["http:","https:"].indexOf(_a.protocol) !== -1 ? (_a.protocol === "https:" ? "443" : "80") : ""),
			host = _a.hostname + (port ? ":" + port : ""),
			origin = _a.origin ? _a.origin : _a.protocol + "//" + host,
			pathname = _a.pathname.slice(0, 1) === "/" ? _a.pathname : "/" + _a.pathname;
		return {
			hash: _a.hash, host: host, hostname: _a.hostname, href: _a.href,
			origin: origin, pathname: pathname, port: port,
			protocol: _a.protocol, search: _a.search
		};
	};

	/**
	 * @summary Given a <code>url</code> that could be relative or full this ensures a full url is returned.
	 * @memberof FooFields.utils.url
	 * @function full
	 * @param {string} url - The url to ensure is full.
	 * @returns {?string} `null` if the given `path` is not a string or empty.
	 * @description Given a full url this will simply return it however if given a relative url this will create a full url using the current location to fill in the blanks.
	 * @example {@run true}
	 * // alias the FooFields.utils.url namespace
	 * var _url = FooFields.utils.url;
	 *
	 * console.log( _url.full( "http://example.com/path/" ) ); // => "http://example.com/path/"
	 * console.log( _url.full( "/path/" ) ); // => "{protocol}//{host}/path/"
	 * console.log( _url.full( "path/" ) ); // => "{protocol}//{host}/{pathname}/path/"
	 * console.log( _url.full( "../path/" ) ); // => "{protocol}//{host}/{calculated pathname}/path/"
	 * console.log( _url.full() ); // => null
	 * console.log( _url.full( 123 ) ); // => null
	 */
	_.url.full = function(url){
		if (!_is.string(url) || _is.empty(url)) return null;
		_a.href = url;
		return _a.href;
	};

	/**
	 * @summary Gets or sets a parameter in the given <code>search</code> string.
	 * @memberof FooFields.utils.url
	 * @function param
	 * @param {string} search - The search string to use (usually `location.search`).
	 * @param {string} key - The key of the parameter.
	 * @param {?string} [value] - The value to set for the parameter. If not provided the current value for the `key` is returned.
	 * @returns {?string} The value of the `key` in the given `search` string if no `value` is supplied or `null` if the `key` does not exist.
	 * @returns {string} A modified `search` string if a `value` is supplied.
	 * @example <caption>Shows how to retrieve a parameter value from a search string.</caption>{@run true}
	 * // alias the FooFields.utils.url namespace
	 * var _url = FooFields.utils.url,
	 * 	// create a search string to test
	 * 	search = "?wmode=opaque&autoplay=1";
	 *
	 * console.log( _url.param( search, "wmode" ) ); // => "opaque"
	 * console.log( _url.param( search, "autoplay" ) ); // => "1"
	 * console.log( _url.param( search, "nonexistent" ) ); // => null
	 * @example <caption>Shows how to set a parameter value in the given search string.</caption>{@run true}
	 * // alias the FooFields.utils.url namespace
	 * var _url = FooFields.utils.url,
	 * 	// create a search string to test
	 * 	search = "?wmode=opaque&autoplay=1";
	 *
	 * console.log( _url.param( search, "wmode", "window" ) ); // => "?wmode=window&autoplay=1"
	 * console.log( _url.param( search, "autoplay", "0" ) ); // => "?wmode=opaque&autoplay=0"
	 * console.log( _url.param( search, "v", "2" ) ); // => "?wmode=opaque&autoplay=1&v=2"
	 */
	_.url.param = function(search, key, value){
		if (!_is.string(search) || !_is.string(key) || _is.empty(key)) return search;
		var regex, match, result, param;
		if (_is.undef(value)){
			regex = new RegExp('[?|&]' + key + '=([^&;]+?)(&|#|;|$)'); // regex to match the key and it's value but only capture the value
			match = regex.exec(search) || ["",""]; // match the param otherwise return an empty string match
			result = match[1].replace(/\+/g, '%20'); // replace any + character's with spaces
			return _is.string(result) && !_is.empty(result) ? decodeURIComponent(result) : null; // decode the result otherwise return null
		}
		if (_is.empty(value)){
			regex = new RegExp('^([^#]*\?)(([^#]*)&)?' + key + '(\=[^&#]*)?(&|#|$)');
			result = search.replace(regex, '$1$3$5').replace(/^([^#]*)((\?)&|\?(#|$))/,'$1$3$4');
		} else {
			regex = new RegExp('([?&])' + key + '[^&]*'); // regex to match the key and it's current value but only capture the preceding ? or & char
			param = key + '=' + encodeURIComponent(value);
			result = search.replace(regex, '$1' + param); // replace any existing instance of the key with the new value
			// If nothing was replaced, then add the new param to the end
			if (result === search && !regex.test(result)) { // if no replacement occurred and the parameter is not currently in the result then add it
				result += (result.indexOf("?") !== -1 ? '&' : '?') + param;
			}
		}
		return result;
	};

	//######################
	//## Type Definitions ##
	//######################

	/**
	 * @summary A plain JavaScript object returned by the {@link FooFields.utils.url.parts} method.
	 * @typedef {Object} FooFields.utils.url~Parts
	 * @property {string} hash - A string containing a `#` followed by the fragment identifier of the URL.
	 * @property {string} host - A string containing the host, that is the hostname, a `:`, and the port of the URL.
	 * @property {string} hostname - A string containing the domain of the URL.
	 * @property {string} href - A string containing the entire URL.
	 * @property {string} origin - A string containing the canonical form of the origin of the specific location.
	 * @property {string} pathname - A string containing an initial `/` followed by the path of the URL.
	 * @property {string} port - A string containing the port number of the URL.
	 * @property {string} protocol - A string containing the protocol scheme of the URL, including the final `:`.
	 * @property {string} search - A string containing a `?` followed by the parameters of the URL. Also known as "querystring".
	 * @see {@link FooFields.utils.url.parts} for example usage.
	 */

})(
	// dependencies
	FooFields.utils,
	FooFields.utils.is
);
(function (_, _is, _fn) {
	// only register methods if this version is the current version
	if (_.version !== '0.1.9') return;

	/**
	 * @summary Contains common string utility methods.
	 * @memberof FooFields.utils
	 * @namespace str
	 */
	_.str = {};

	/**
	 * @summary Converts the given `target` to camel case.
	 * @memberof FooFields.utils.str
	 * @function camel
	 * @param {string} target - The string to camel case.
	 * @returns {string}
	 * @example {@run true}
	 * // alias the FooFields.utils.str namespace
	 * var _str = FooFields.utils.str;
	 *
	 * console.log( _str.camel( "max-width" ) ); // => "maxWidth"
	 * console.log( _str.camel( "max--width" ) ); // => "maxWidth"
	 * console.log( _str.camel( "max Width" ) ); // => "maxWidth"
	 * console.log( _str.camel( "Max_width" ) ); // => "maxWidth"
	 * console.log( _str.camel( "MaxWidth" ) ); // => "maxWidth"
	 * console.log( _str.camel( "Abbreviations like CSS are left intact" ) ); // => "abbreviationsLikeCSSAreLeftIntact"
	 */
	_.str.camel = function (target) {
		if (_is.empty(target)) return target;
		if (target.toUpperCase() === target) return target.toLowerCase();
		return target.replace(/^([A-Z])|[-\s_]+(\w)/g, function (match, p1, p2) {
			if (_is.string(p2)) return p2.toUpperCase();
			return p1.toLowerCase();
		});
	};

	/**
	 * @summary Converts the given `target` to kebab case. Non-alphanumeric characters are converted to `-`.
	 * @memberof FooFields.utils.str
	 * @function kebab
	 * @param {string} target - The string to kebab case.
	 * @returns {string}
	 * @example {@run true}
	 * // alias the FooFields.utils.str namespace
	 * var _str = FooFields.utils.str;
	 *
	 * console.log( _str.kebab( "max-width" ) ); // => "max-width"
	 * console.log( _str.kebab( "max--width" ) ); // => "max-width"
	 * console.log( _str.kebab( "max Width" ) ); // => "max-width"
	 * console.log( _str.kebab( "Max_width" ) ); // => "max-width"
	 * console.log( _str.kebab( "MaxWidth" ) ); // => "max-width"
	 * console.log( _str.kebab( "Non-alphanumeric ch@racters are converted to dashes!" ) ); // => "non-alphanumeric-ch-racters-are-converted-to-dashes"
	 */
	_.str.kebab = function(target){
		if (_is.empty(target)) return target;
		return target
			.match(/[A-Z]{2,}(?=[A-Z][a-z0-9]*|\b)|[A-Z]?[a-z0-9]*|[A-Z]|[0-9]+/g)
			.filter(Boolean)
			.map(function(x){ return x.toLowerCase(); })
			.join('-');
	};

	/**
	 * @summary Checks if the `target` contains the given `substr`.
	 * @memberof FooFields.utils.str
	 * @function contains
	 * @param {string} target - The string to check.
	 * @param {string} substr - The string to check for.
	 * @param {boolean} [ignoreCase=false] - Whether or not to ignore casing when performing the check.
	 * @returns {boolean} `true` if the `target` contains the given `substr`.
	 * @example {@run true}
	 * // alias the FooFields.utils.str namespace
	 * var _str = FooFields.utils.str,
	 * 	// create a string to test
	 * 	target = "To be, or not to be, that is the question.";
	 *
	 * console.log( _str.contains( target, "To be" ) ); // => true
	 * console.log( _str.contains( target, "question" ) ); // => true
	 * console.log( _str.contains( target, "no" ) ); // => true
	 * console.log( _str.contains( target, "nonexistent" ) ); // => false
	 * console.log( _str.contains( target, "TO BE" ) ); // => false
	 * console.log( _str.contains( target, "TO BE", true ) ); // => true
	 */
	_.str.contains = function (target, substr, ignoreCase) {
		if (!_is.string(target) || _is.empty(target) || !_is.string(substr) || _is.empty(substr)) return false;
		return substr.length <= target.length
			&& (!!ignoreCase ? target.toUpperCase().indexOf(substr.toUpperCase()) : target.indexOf(substr)) !== -1;
	};

	/**
	 * @summary Checks if the `target` contains the given `word`.
	 * @memberof FooFields.utils.str
	 * @function containsWord
	 * @param {string} target - The string to check.
	 * @param {string} word - The word to check for.
	 * @param {boolean} [ignoreCase=false] - Whether or not to ignore casing when performing the check.
	 * @returns {boolean} `true` if the `target` contains the given `word`.
	 * @description This method differs from {@link FooFields.utils.str.contains} in that it searches for whole words by splitting the `target` string on word boundaries (`\b`) and then comparing the individual parts.
	 * @example {@run true}
	 * // alias the FooFields.utils.str namespace
	 * var _str = FooFields.utils.str,
	 * 	// create a string to test
	 * 	target = "To be, or not to be, that is the question.";
	 *
	 * console.log( _str.containsWord( target, "question" ) ); // => true
	 * console.log( _str.containsWord( target, "no" ) ); // => false
	 * console.log( _str.containsWord( target, "NOT" ) ); // => false
	 * console.log( _str.containsWord( target, "NOT", true ) ); // => true
	 * console.log( _str.containsWord( target, "nonexistent" ) ); // => false
	 */
	_.str.containsWord = function(target, word, ignoreCase){
		if (!_is.string(target) || _is.empty(target) || !_is.string(word) || _is.empty(word) || target.length < word.length)
			return false;
		var parts = target.split(/\W/);
		for (var i = 0, len = parts.length; i < len; i++){
			if (ignoreCase ? parts[i].toUpperCase() === word.toUpperCase() : parts[i] === word) return true;
		}
		return false;
	};

	/**
	 * @summary Checks if the `target` ends with the given `substr`.
	 * @memberof FooFields.utils.str
	 * @function endsWith
	 * @param {string} target - The string to check.
	 * @param {string} substr - The substr to check for.
	 * @returns {boolean} `true` if the `target` ends with the given `substr`.
	 * @example {@run true}
	 * // alias the FooFields.utils.str namespace
	 * var _str = FooFields.utils.str;
	 *
	 * console.log( _str.endsWith( "something", "g" ) ); // => true
	 * console.log( _str.endsWith( "something", "ing" ) ); // => true
	 * console.log( _str.endsWith( "something", "no" ) ); // => false
	 */
	_.str.endsWith = function (target, substr) {
		if (!_is.string(target) || _is.empty(target) || !_is.string(substr) || _is.empty(substr)) return target === substr;
		return target.slice(target.length - substr.length) === substr;
	};

	/**
	 * @summary Escapes the `target` for use in a regular expression.
	 * @memberof FooFields.utils.str
	 * @function escapeRegExp
	 * @param {string} target - The string to escape.
	 * @returns {string}
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions|Regular Expressions: Using Special Characters - JavaScript | MDN}
	 */
	_.str.escapeRegExp = function(target){
		if (_is.empty(target)) return target;
		return target.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	};

	/**
	 * @summary Generates a 32 bit FNV-1a hash from the given `target`.
	 * @memberof FooFields.utils.str
	 * @function fnv1a
	 * @param {string} target - The string to generate a hash from.
	 * @returns {?number} `null` if the `target` is not a string or empty otherwise a 32 bit FNV-1a hash.
	 * @example {@run true}
	 * // alias the FooFields.utils.str namespace
	 * var _str = FooFields.utils.str;
	 *
	 * console.log( _str.fnv1a( "Some string to generate a hash for." ) ); // => 207568994
	 * console.log( _str.fnv1a( "Some string to generate a hash for" ) ); // => 1350435704
	 * @see {@link https://en.wikipedia.org/wiki/Fowler%E2%80%93Noll%E2%80%93Vo_hash_function|Fowler–Noll–Vo hash function}
	 */
	_.str.fnv1a = function(target){
		if (!_is.string(target) || _is.empty(target)) return null;
		var i, l, hval = 0x811c9dc5;
		for (i = 0, l = target.length; i < l; i++) {
			hval ^= target.charCodeAt(i);
			hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
		}
		return hval >>> 0;
	};

	/**
	 * @summary Returns the remainder of the `target` split on the first index of the given `substr`.
	 * @memberof FooFields.utils.str
	 * @function from
	 * @param {string} target - The string to split.
	 * @param {string} substr - The substring to split on.
	 * @returns {?string} `null` if the given `substr` does not exist within the `target`.
	 * @example {@run true}
	 * // alias the FooFields.utils.str namespace
	 * var _str = FooFields.utils.str,
	 * 	// create a string to test
	 * 	target = "To be, or not to be, that is the question.";
	 *
	 * console.log( _str.from( target, "no" ) ); // => "t to be, that is the question."
	 * console.log( _str.from( target, "that" ) ); // => " is the question."
	 * console.log( _str.from( target, "question" ) ); // => "."
	 * console.log( _str.from( target, "nonexistent" ) ); // => null
	 */
	_.str.from = function (target, substr) {
		if (!_is.string(target) || _is.empty(target) || !_is.string(substr) || _is.empty(substr)) return null;
		return _.str.contains(target, substr) ? target.substring(target.indexOf(substr) + substr.length) : null;
	};

	/**
	 * @summary Joins any number of strings using the given `separator`.
	 * @memberof FooFields.utils.str
	 * @function join
	 * @param {string} separator - The separator to use to join the strings.
	 * @param {string} part - The first string to join.
	 * @param {...string} [partN] - Any number of additional strings to join.
	 * @returns {?string}
	 * @description This method differs from using the standard `Array.prototype.join` function to join strings in that it ignores empty parts and checks to see if each starts with the supplied `separator`. If the part starts with the `separator` it is removed before appending it to the final result.
	 * @example {@run true}
	 * // alias the FooFields.utils.str namespace
	 * var _str = FooFields.utils.str;
	 *
	 * console.log( _str.join( "_", "all", "in", "one" ) ); // => "all_in_one"
	 * console.log( _str.join( "_", "all", "_in", "one" ) ); // => "all_in_one"
	 * console.log( _str.join( "/", "http://", "/example.com/", "/path/to/image.png" ) ); // => "http://example.com/path/to/image.png"
	 * console.log( _str.join( "/", "http://", "/example.com", "/path/to/image.png" ) ); // => "http://example.com/path/to/image.png"
	 * console.log( _str.join( "/", "http://", "example.com", "path/to/image.png" ) ); // => "http://example.com/path/to/image.png"
	 */
	_.str.join = function(separator, part, partN){
		if (!_is.string(separator) || !_is.string(part)) return null;
		var parts = _fn.arg2arr(arguments);
		separator = parts.shift();
		var i, l, result = parts.shift();
		for (i = 0, l = parts.length; i < l; i++){
			part = parts[i];
			if (_is.empty(part)) continue;
			if (_.str.endsWith(result, separator)){
				result = result.slice(0, result.length-separator.length);
			}
			if (_.str.startsWith(part, separator)){
				part = part.slice(separator.length);
			}
			result += separator + part;
		}
		return result;
	};

	/**
	 * @summary Checks if the `target` starts with the given `substr`.
	 * @memberof FooFields.utils.str
	 * @function startsWith
	 * @param {string} target - The string to check.
	 * @param {string} substr - The substr to check for.
	 * @returns {boolean} `true` if the `target` starts with the given `substr`.
	 * @example {@run true}
	 * // alias the FooFields.utils.str namespace
	 * var _str = FooFields.utils.str;
	 *
	 * console.log( _str.startsWith( "something", "s" ) ); // => true
	 * console.log( _str.startsWith( "something", "some" ) ); // => true
	 * console.log( _str.startsWith( "something", "no" ) ); // => false
	 */
	_.str.startsWith = function (target, substr) {
		if (_is.empty(target) || _is.empty(substr)) return false;
		return target.slice(0, substr.length) === substr;
	};

	/**
	 * @summary Returns the first part of the `target` split on the first index of the given `substr`.
	 * @memberof FooFields.utils.str
	 * @function until
	 * @param {string} target - The string to split.
	 * @param {string} substr - The substring to split on.
	 * @returns {string} The `target` if the `substr` does not exist.
	 * @example {@run true}
	 * // alias the FooFields.utils.str namespace
	 * var _str = FooFields.utils.str,
	 * 	// create a string to test
	 * 	target = "To be, or not to be, that is the question.";
	 *
	 * console.log( _str.until( target, "no" ) ); // => "To be, or "
	 * console.log( _str.until( target, "that" ) ); // => "To be, or not to be, "
	 * console.log( _str.until( target, "question" ) ); // => "To be, or not to be, that is the "
	 * console.log( _str.until( target, "nonexistent" ) ); // => "To be, or not to be, that is the question."
	 */
	_.str.until = function (target, substr) {
		if (_is.empty(target) || _is.empty(substr)) return target;
		return _.str.contains(target, substr) ? target.substring(0, target.indexOf(substr)) : target;
	};

	/**
	 * @summary A basic string formatter that can use both index and name based placeholders but handles only string or number replacements.
	 * @memberof FooFields.utils.str
	 * @function format
	 * @param {string} target - The format string containing any placeholders to replace.
	 * @param {string|number|Object|Array} arg1 - The first value to format the target with. If an object is supplied it's properties are used to match named placeholders. If an array, string or number is supplied it's values are used to match any index placeholders.
	 * @param {...(string|number)} [argN] - Any number of additional strings or numbers to format the target with.
	 * @returns {string} The string formatted with the supplied arguments.
	 * @description This method allows you to supply the replacements as an object when using named placeholders or as an array or additional arguments when using index placeholders.
	 *
	 * This does not perform a simultaneous replacement of placeholders, which is why it's referred to as a basic formatter. This means replacements that contain placeholders within there value could end up being replaced themselves as seen in the last example.
	 * @example {@caption The following shows how to use index placeholders.}{@run true}
	 * // alias the FooFields.utils.str namespace
	 * var _str = FooFields.utils.str,
	 * 	// create a format string using index placeholders
	 * 	format = "Hello, {0}, are you feeling {1}?";
	 *
	 * console.log( _str.format( format, "Steve", "OK" ) ); // => "Hello, Steve, are you feeling OK?"
	 * // or
	 * console.log( _str.format( format, [ "Steve", "OK" ] ) ); // => "Hello, Steve, are you feeling OK?"
	 * @example {@caption While the above works perfectly fine the downside is that the placeholders provide no clues as to what should be supplied as a replacement value, this is were supplying an object and using named placeholders steps in.}{@run true}
	 * // alias the FooFields.utils.str namespace
	 * var _str = FooFields.utils.str,
	 * 	// create a format string using named placeholders
	 * 	format = "Hello, {name}, are you feeling {adjective}?";
	 *
	 * console.log( _str.format( format, {name: "Steve", adjective: "OK"} ) ); // => "Hello, Steve, are you feeling OK?"
	 * @example {@caption The following demonstrates the issue with not performing a simultaneous replacement of placeholders.}{@run true}
	 * // alias the FooFields.utils.str namespace
	 * var _str = FooFields.utils.str;
	 *
	 * console.log( _str.format("{0}{1}", "{1}", "{0}") ); // => "{0}{0}"
	 *
	 * // If the replacement happened simultaneously the result would be "{1}{0}" but this method executes
	 * // replacements synchronously as seen below:
	 *
	 * // "{0}{1}".replace( "{0}", "{1}" )
	 * // => "{1}{1}".replace( "{1}", "{0}" )
	 * // => "{0}{0}"
	 */
	_.str.format = function (target, arg1, argN){
		var args = _fn.arg2arr(arguments);
		target = args.shift(); // remove the target from the args
		if (_is.empty(target) || _is.empty(args)) return target;
		if (args.length === 1 && (_is.array(args[0]) || _is.object(args[0]))){
			args = args[0];
		}
		for (var arg in args){
			target = target.replace(new RegExp("\\{" + arg + "\\}", "gi"), args[arg]);
		}
		return target;
	};

})(
	// dependencies
	FooFields.utils,
	FooFields.utils.is,
	FooFields.utils.fn
);
(function($, _, _is, _fn, _str){
	// only register methods if this version is the current version
	if (_.version !== '0.1.9') return;

	/**
	 * @summary Contains common object utility methods.
	 * @memberof FooFields.utils
	 * @namespace obj
	 */
	_.obj = {};

	// used by the obj.create method
	var Obj = function () {};
	/**
	 * @summary Creates a new object with the specified prototype.
	 * @memberof FooFields.utils.obj
	 * @function create
	 * @param {object} proto - The object which should be the prototype of the newly-created object.
	 * @returns {object} A new object with the specified prototype.
	 * @description This is a basic implementation of the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create|Object.create} method.
	 */
	_.obj.create = function (proto) {
		if (!_is.object(proto))
			throw TypeError('Argument must be an object');
		Obj.prototype = proto;
		var result = new Obj();
		Obj.prototype = null;
		return result;
	};

	/**
	 * @summary Merge the contents of two or more objects together into the first `target` object.
	 * @memberof FooFields.utils.obj
	 * @function extend
	 * @param {Object} target - The object to merge properties into.
	 * @param {Object} object - An object containing properties to merge.
	 * @param {...Object} [objectN] - Additional objects containing properties to merge.
	 * @returns {Object} The `target` merged with the contents from any additional objects.
	 * @description This does not merge arrays by index as jQuery does, it treats them as a single property and replaces the array with a shallow copy of the new one.
	 *
	 * This method makes use of the {@link FooFields.utils.obj.merge} method internally.
	 * @example {@run true}
	 * // alias the FooFields.utils.obj namespace
	 * var _obj = FooFields.utils.obj,
	 * 	// create some objects to merge
	 * 	defaults = {"name": "My Object", "enabled": false, "arr": [1,2,3]},
	 * 	options = {"enabled": true, "something": 123, "arr": [4,5,6]};
	 *
	 * // merge the two objects into a new third one without modifying either of the originals
	 * var settings = _obj.extend( {}, defaults, options );
	 *
	 * console.log( settings ); // => {"name": "My Object", "enabled": true, "arr": [4,5,6], "something": 123}
	 * console.log( defaults ); // => {"name": "My Object", "enabled": true, "arr": [1,2,3]}
	 * console.log( options ); // => {"enabled": true, "arr": [4,5,6], "something": 123}
	 */
	_.obj.extend = function(target, object, objectN){
		target = _is.object(target) ? target : {};
		var objects = _fn.arg2arr(arguments);
		objects.shift();
		$.each(objects, function(i, object){
			_.obj.merge(target, object);
		});
		return target;
	};

	/**
	 * @summary Merge the contents of two objects together into the first `target` object.
	 * @memberof FooFields.utils.obj
	 * @function merge
	 * @param {Object} target - The object to merge properties into.
	 * @param {Object} object - The object containing properties to merge.
	 * @returns {Object} The `target` merged with the contents from the `object`.
	 * @description This does not merge arrays by index as jQuery does, it treats them as a single property and replaces the array with a shallow copy of the new one.
	 *
	 * This method is used internally by the {@link FooFields.utils.obj.extend} method.
	 * @example {@run true}
	 * // alias the FooFields.utils.obj namespace
	 * var _obj = FooFields.utils.obj,
	 * 	// create some objects to merge
	 * 	target = {"name": "My Object", "enabled": false, "arr": [1,2,3]},
	 * 	object = {"enabled": true, "something": 123, "arr": [4,5,6]};
	 *
	 * console.log( _obj.merge( target, object ) ); // => {"name": "My Object", "enabled": true, "arr": [4,5,6], "something": 123}
	 */
	_.obj.merge = function(target, object){
		target = _is.hash(target) ? target : {};
		object = _is.hash(object) ? object : {};
		for (var prop in object) {
			if (object.hasOwnProperty(prop)) {
				if (_is.hash(object[prop])) {
					target[prop] = _is.hash(target[prop]) ? target[prop] : {};
					_.obj.merge(target[prop], object[prop]);
				} else if (_is.array(object[prop])) {
					target[prop] = object[prop].slice();
				} else {
					target[prop] = object[prop];
				}
			}
		}
		return target;
	};

	/**
	 * @summary Merge the validated properties of the `object` into the `target` using the optional `mappings`.
	 * @memberof FooFields.utils.obj
	 * @function mergeValid
	 * @param {Object} target - The object to merge properties into.
	 * @param {FooFields.utils.obj~Validators} validators - An object containing validators for the `target` object properties.
	 * @param {Object} object - The object containing properties to merge.
	 * @param {FooFields.utils.obj~Mappings} [mappings] - An object containing property name mappings.
	 * @returns {Object} The modified `target` object containing any valid properties from the supplied `object`.
	 * @example {@caption Shows the basic usage for this method and shows how invalid properties or those with no corresponding validator are ignored.}{@run true}
	 * // alias the FooFields.utils.obj and FooFields.utils.is namespaces
	 * var _obj = FooFields.utils.obj,
	 * 	_is = FooFields.utils.is;
	 *
	 * //create the target object and it's validators
	 * var target = {"name":"John","location":"unknown"},
	 * 	validators = {"name":_is.string,"location":_is.string};
	 *
	 * // create the object to merge into the target
	 * var object = {
	 * 	"name": 1234, // invalid
	 * 	"location": "Liverpool", // updated
	 * 	"notMerged": true // ignored
	 * };
	 *
	 * // merge the object into the target, invalid properties or those with no corresponding validator are ignored.
	 * console.log( _obj.mergeValid( target, validators, object ) ); // => { "name": "John", "location": "Liverpool" }
	 * @example {@caption Shows how to supply a mappings object for this method.}{@run true}
	 * // alias the FooFields.utils.obj and FooFields.utils.is namespaces
	 * var _obj = FooFields.utils.obj,
	 * 	_is = FooFields.utils.is;
	 *
	 * //create the target object and it's validators
	 * var target = {"name":"John","location":"unknown"},
	 * 	validators = {"name":_is.string,"location":_is.string};
	 *
	 * // create the object to merge into the target
	 * var object = {
	 * 	"name": { // ignored
	 * 		"proper": "Christopher", // mapped to name if short is invalid
	 * 		"short": "Chris" // map to name
	 * 	},
	 * 	"city": "London" // map to location
	 * };
	 *
	 * // create the mapping object
	 * var mappings = {
	 * 	"name": [ "name.short", "name.proper" ], // try use the short name and fallback to the proper
	 * 	"location": "city"
	 * };
	 *
	 * // merge the object into the target using the mappings, invalid properties or those with no corresponding validator are ignored.
	 * console.log( _obj.mergeValid( target, validators, object, mappings ) ); // => { "name": "Chris", "location": "London" }
	 */
	_.obj.mergeValid = function(target, validators, object, mappings){
		if (!_is.hash(object) || !_is.hash(validators)) return target;
		validators = _is.hash(validators) ? validators : {};
		mappings = _is.hash(mappings) ? mappings : {};
		var prop, maps, value;
		for (prop in validators){
			if (!validators.hasOwnProperty(prop) || !_is.fn(validators[prop])) continue;
			maps = _is.array(mappings[prop]) ? mappings[prop] : (_is.string(mappings[prop]) ? [mappings[prop]] : [prop]);
			$.each(maps, function(i, map){
				value = _.obj.prop(object, map);
				if (_is.undef(value)) return; // continue
				if (validators[prop](value)){
					_.obj.prop(target, prop, value);
					return false; // break
				}
			});
		}
		return target;
	};

	/**
	 * @summary Get or set a property value given its `name`.
	 * @memberof FooFields.utils.obj
	 * @function prop
	 * @param {Object} object - The object to inspect for the property.
	 * @param {string} name - The name of the property to fetch. This can be a `.` notated name.
	 * @param {*} [value] - If supplied this is the value to set for the property.
	 * @returns {*} The value for the `name` property, if it does not exist then `undefined`.
	 * @returns {undefined} If a `value` is supplied this method returns nothing.
	 * @example {@caption Shows how to get a property value from an object.}{@run true}
	 * // alias the FooFields.utils.obj namespace
	 * var _obj = FooFields.utils.obj,
	 * 	// create an object to test
	 * 	object = {
	 * 		"name": "My Object",
	 * 		"some": {
	 * 			"thing": 123
	 * 		}
	 * 	};
	 *
	 * console.log( _obj.prop( object, "name" ) ); // => "My Object"
	 * console.log( _obj.prop( object, "some.thing" ) ); // => 123
	 * @example {@caption Shows how to set a property value for an object.}{@run true}
	 * // alias the FooFields.utils.obj namespace
	 * var _obj = FooFields.utils.obj,
	 * 	// create an object to test
	 * 	object = {
	 * 		"name": "My Object",
	 * 		"some": {
	 * 			"thing": 123
	 * 		}
	 * 	};
	 *
	 * _obj.prop( object, "name", "My Updated Object" );
	 * _obj.prop( object, "some.thing", 987 );
	 *
	 * console.log( object ); // => { "name": "My Updated Object", "some": { "thing": 987 } }
	 */
	_.obj.prop = function(object, name, value){
		if (!_is.object(object) || _is.empty(name)) return;
		var parts, last;
		if (_is.undef(value)){
			if (_str.contains(name, '.')){
				parts = name.split('.');
				last = parts.length - 1;
				$.each(parts, function(i, part){
					if (i === last){
						value = object[part];
					} else if (_is.hash(object[part])) {
						object = object[part];
					} else {
						// exit early
						return false;
					}
				});
			} else if (!_is.undef(object[name])){
				value = object[name];
			}
			return value;
		}
		if (_str.contains(name, '.')){
			parts = name.split('.');
			last = parts.length - 1;
			$.each(parts, function(i, part){
				if (i === last){
					object[part] = value;
				} else {
					object = _is.hash(object[part]) ? object[part] : (object[part] = {});
				}
			});
		} else if (!_is.undef(object[name])){
			object[name] = value;
		}
	};

	//######################
	//## Type Definitions ##
	//######################

	/**
	 * @summary An object used by the {@link FooFields.utils.obj.mergeValid|mergeValid} method to map new values onto the `target` object.
	 * @typedef {Object.<string,string>|Object.<string,Array.<string>>} FooFields.utils.obj~Mappings
	 * @description The mappings object is a single level object. If you want to map a property from/to a child object on either the source or target objects you must supply the name using `.` notation as seen in the below example with the `"name.first"` to `"Name.Short"` mapping.
	 * @example {@caption The basic structure of a mappings object is the below.}
	 * {
	 * 	"TargetName": "SourceName", // for top level properties
	 * 	"Child.TargetName": "Child.SourceName" // for child properties
	 * }
	 * @example {@caption Given the following target object.}
	 * var target = {
	 * 	"name": {
	 * 		"first": "",
	 * 		"last": null
	 * 	},
	 * 	"age": 0
	 * };
	 * @example {@caption And the following object to merge.}
	 * var object = {
	 * 	"Name": {
	 * 		"Full": "Christopher",
	 * 		"Short": "Chris"
	 * 	},
	 * 	"Age": 32
	 * };
	 * @example {@caption The mappings object would look like the below.}
	 * var mappings = {
	 * 	"name.first": "Name.Short",
	 * 	"age": "Age"
	 * };
	 * @example {@caption If you want the `"name.first"` property to try to use the `"Name.Short"` value but fallback to `"Name.Proper"` you can specify the mapping value as an array.}
	 * var mappings = {
	 * 	"name.first": [ "Name.Short", "Name.Proper" ],
	 * 	"age": "Age"
	 * };
	 */

	/**
	 * @summary An object used by the {@link FooFields.utils.obj.mergeValid|mergeValid} method to validate properties.
	 * @typedef {Object.<string,function(*):boolean>} FooFields.utils.obj~Validators
	 * @description The validators object is a single level object. If you want to validate a property of a child object you must supply the name using `.` notation as seen in the below example with the `"name.first"` and `"name.last"` properties.
	 *
	 * Any function that accepts a value to test as the first argument and returns a boolean can be used as a validator. This means the majority of the {@link FooFields.utils.is} methods can be used directly. If the property supports multiple types just provide your own function as seen with `"name.last"` in the below example.
	 * @example {@caption The basic structure of a validators object is the below.}
	 * {
	 * 	"PropName": function(*):boolean, // for top level properties
	 * 	"Child.PropName": function(*):boolean // for child properties
	 * }
	 * @example {@caption Given the following target object.}
	 * var target = {
	 * 	"name": {
	 * 		"first": "", // must be a string
	 * 		"last": null // must be a string or null
	 * 	},
	 * 	"age": 0 // must be a number
	 * };
	 * @example {@caption The validators object could be created as seen below.}
	 * // alias the FooFields.utils.is namespace
	 * var _is = FooFields.utils.is;
	 *
	 * var validators = {
	 * 	"name.first": _is.string,
	 * 	"name.last": function(value){
	 * 		return _is.string(value) || value === null;
	 * 	},
	 * 	"age": _is.number
	 * };
	 */

})(
	// dependencies
	FooFields.utils.$,
	FooFields.utils,
	FooFields.utils.is,
	FooFields.utils.fn,
	FooFields.utils.str
);
(function($, _, _is){
	// only register methods if this version is the current version
	if (_.version !== '0.1.9') return;

	// any methods that have dependencies but don't fall into a specific subset or namespace can be added here

	/**
	 * @summary The callback for the {@link FooFields.utils.ready} method.
	 * @callback FooFields.utils~readyCallback
	 * @param {jQuery} $ - The instance of jQuery the plugin was registered with.
	 * @this window
	 * @see Take a look at the {@link FooFields.utils.ready} method for example usage.
	 */

	/**
	 * @summary Waits for the DOM to be accessible and then executes the supplied callback.
	 * @memberof FooFields.utils
	 * @function ready
	 * @param {FooFields.utils~readyCallback} callback - The function to execute once the DOM is accessible.
	 * @example {@caption This method can be used as a replacement for the jQuery ready callback to avoid an error in another script stopping our scripts from running.}
	 * FooFields.utils.ready(function($){
	 * 	// do something
	 * });
	 */
	_.ready = function (callback) {
		function onready(){
			try { callback.call(window, _.$); }
			catch(err) { console.error(err); }
		}
		if (Function('/*@cc_on return true@*/')() ? document.readyState === "complete" : document.readyState !== "loading") onready();
		else document.addEventListener('DOMContentLoaded', onready, false);
	};

	// A variable to hold the last number used to generate an ID in the current page.
	var uniqueId = 0;

	/**
	 * @summary Generate and apply a unique id for the given `$element`.
	 * @memberof FooFields.utils
	 * @function uniqueId
	 * @param {jQuery} $element - The jQuery element object to retrieve an id from or generate an id for.
	 * @param {string} [prefix="uid-"] - A prefix to append to the start of any generated ids.
	 * @returns {string} Either the `$element`'s existing id or a generated one that has been applied to it.
	 * @example {@run true}
	 * // alias the FooFields.utils namespace
	 * var _ = FooFields.utils;
	 *
	 * // create some elements to test
	 * var $hasId = $("<span/>", {id: "exists"});
	 * var $generatedId = $("<span/>");
	 * var $generatedPrefixedId = $("<span/>");
	 *
	 * console.log( _.uniqueId( $hasId ) ); // => "exists"
	 * console.log( $hasId.attr( "id" ) ); // => "exists"
	 * console.log( _.uniqueId( $generatedId ) ); // => "uid-1"
	 * console.log( $generatedId.attr( "id" ) ); // => "uid-1"
	 * console.log( _.uniqueId( $generatedPrefixedId, "plugin-" ) ); // => "plugin-2"
	 * console.log( $generatedPrefixedId.attr( "id" ) ); // => "plugin-2"
	 */
	_.uniqueId = function($element, prefix){
		var id = $element.attr('id');
		if (_is.empty(id)){
			prefix = _is.string(prefix) && !_is.empty(prefix) ? prefix : "uid-";
			id = prefix + (++uniqueId);
			$element.attr('id', id).data('__uniqueId__', true);
		}
		return id;
	};

	/**
	 * @summary Remove the id from the given `$element` if it was set using the {@link FooFields.utils.uniqueId|uniqueId} method.
	 * @memberof FooFields.utils
	 * @function removeUniqueId
	 * @param {jQuery} $element - The jQuery element object to remove a generated id from.
	 * @example {@run true}
	 * // alias the FooFields.utils namespace
	 * var _ = FooFields.utils;
	 *
	 * // create some elements to test
	 * var $hasId = $("<span/>", {id: "exists"});
	 * var $generatedId = $("<span/>");
	 * var $generatedPrefixedId = $("<span/>");
	 *
	 * console.log( _.uniqueId( $hasId ) ); // => "exists"
	 * console.log( _.uniqueId( $generatedId ) ); // => "uid-1"
	 * console.log( _.uniqueId( $generatedPrefixedId, "plugin-" ) ); // => "plugin-2"
	 */
	_.removeUniqueId = function($element){
		if ($element.data('__uniqueId__')){
			$element.removeAttr('id').removeData('__uniqueId__');
		}
	};

	/**
	 * @summary Convert CSS class names into CSS selectors.
	 * @memberof FooFields.utils
	 * @function selectify
	 * @param {(string|string[]|object)} classes - A space delimited string of CSS class names or an array of them with each item being included in the selector using the OR (`,`) syntax as a separator. If an object is supplied the result will be an object with the same property names but the values converted to selectors.
	 * @returns {(object|string)}
	 * @example {@caption Shows how the method can be used.}
	 * // alias the FooFields.utils namespace
	 * var _ = FooFields.utils;
	 *
	 * console.log( _.selectify("my-class") ); // => ".my-class"
	 * console.log( _.selectify("my-class my-other-class") ); // => ".my-class.my-other-class"
	 * console.log( _.selectify(["my-class", "my-other-class"]) ); // => ".my-class,.my-other-class"
	 * console.log( _.selectify({
	 * 	class1: "my-class",
	 * 	class2: "my-class my-other-class",
	 * 	class3: ["my-class", "my-other-class"]
	 * }) ); // => { class1: ".my-class", class2: ".my-class.my-other-class", class3: ".my-class,.my-other-class" }
	 */
	_.selectify = function (classes) {
		if (_is.empty(classes)) return null;
		if (_is.hash(classes)) {
			var result = {}, selector;
			for (var name in classes) {
				if (!classes.hasOwnProperty(name)) continue;
				selector = _.selectify(classes[name]);
				if (selector) {
					result[name] = selector;
				}
			}
			return result;
		}
		if (_is.string(classes) || _is.array(classes)) {
			if (_is.string(classes)) classes = [classes];
			return classes.map(function(str){
				return _is.string(str) ? "." + str.split(/\s/g).join(".") : null;
			}).join(",");
		}
		return null;
	};

	/**
	 * @summary Parses the supplied `src` and `srcset` values and returns the best matching URL for the supplied render size.
	 * @memberof FooFields.utils
	 * @function src
	 * @param {string} src - The default src for the image.
	 * @param {string} srcset - The srcset containing additional image sizes.
	 * @param {number} srcWidth - The width of the `src` image.
	 * @param {number} srcHeight - The height of the `src` image.
	 * @param {number} renderWidth - The rendered width of the image element.
	 * @param {number} renderHeight - The rendered height of the image element.
	 * @param {number} [devicePixelRatio] - The device pixel ratio to use while parsing. Defaults to the current device pixel ratio.
	 * @returns {(string|null)} Returns the parsed responsive src or null if no src is provided.
	 * @description This can be used to parse the correct src to use when loading an image through JavaScript.
	 * @example {@caption The following shows using the method with the srcset w-descriptor.}{@run true}
	 * var src = "test-240x120.jpg",
	 * 	width = 240, // the naturalWidth of the 'src' image
	 * 	height = 120, // the naturalHeight of the 'src' image
	 * 	srcset = "test-480x240.jpg 480w, test-720x360.jpg 720w, test-960x480.jpg 960w";
	 *
	 * console.log( FooFields.utils.src( src, srcset, width, height, 240, 120, 1 ) ); // => "test-240x120.jpg"
	 * console.log( FooFields.utils.src( src, srcset, width, height, 240, 120, 2 ) ); // => "test-480x240.jpg"
	 * console.log( FooFields.utils.src( src, srcset, width, height, 480, 240, 1 ) ); // => "test-480x240.jpg"
	 * console.log( FooFields.utils.src( src, srcset, width, height, 480, 240, 2 ) ); // => "test-960x480.jpg"
	 * console.log( FooFields.utils.src( src, srcset, width, height, 720, 360, 1 ) ); // => "test-720x360.jpg"
	 * console.log( FooFields.utils.src( src, srcset, width, height, 960, 480, 1 ) ); // => "test-960x480.jpg"
	 * @example {@caption The following shows using the method with the srcset h-descriptor.}{@run true}
	 * var src = "test-240x120.jpg",
	 * 	width = 240, // the naturalWidth of the 'src' image
	 * 	height = 120, // the naturalHeight of the 'src' image
	 * 	srcset = "test-480x240.jpg 240h, test-720x360.jpg 360h, test-960x480.jpg 480h";
	 *
	 * console.log( FooFields.utils.src( src, srcset, width, height, 240, 120, 1 ) ); // => "test-240x120.jpg"
	 * console.log( FooFields.utils.src( src, srcset, width, height, 240, 120, 2 ) ); // => "test-480x240.jpg"
	 * console.log( FooFields.utils.src( src, srcset, width, height, 480, 240, 1 ) ); // => "test-480x240.jpg"
	 * console.log( FooFields.utils.src( src, srcset, width, height, 480, 240, 2 ) ); // => "test-960x480.jpg"
	 * console.log( FooFields.utils.src( src, srcset, width, height, 720, 360, 1 ) ); // => "test-720x360.jpg"
	 * console.log( FooFields.utils.src( src, srcset, width, height, 960, 480, 1 ) ); // => "test-960x480.jpg"
	 * @example {@caption The following shows using the method with the srcset x-descriptor.}{@run true}
	 * var src = "test-240x120.jpg",
	 * 	width = 240, // the naturalWidth of the 'src' image
	 * 	height = 120, // the naturalHeight of the 'src' image
	 * 	srcset = "test-480x240.jpg 2x, test-720x360.jpg 3x, test-960x480.jpg 4x";
	 *
	 * console.log( FooFields.utils.src( src, srcset, width, height, 240, 120, 1 ) ); // => "test-240x120.jpg"
	 * console.log( FooFields.utils.src( src, srcset, width, height, 240, 120, 2 ) ); // => "test-480x240.jpg"
	 * console.log( FooFields.utils.src( src, srcset, width, height, 480, 240, 1 ) ); // => "test-240x120.jpg"
	 * console.log( FooFields.utils.src( src, srcset, width, height, 480, 240, 2 ) ); // => "test-480x240.jpg"
	 * console.log( FooFields.utils.src( src, srcset, width, height, 720, 360, 1 ) ); // => "test-240x120.jpg"
	 * console.log( FooFields.utils.src( src, srcset, width, height, 960, 480, 1 ) ); // => "test-240x120.jpg"
	 */
	_.src = function(src, srcset, srcWidth, srcHeight, renderWidth, renderHeight, devicePixelRatio){
		if (!_is.string(src)) return null;
		// if there is no srcset just return the src
		if (!_is.string(srcset)) return src;

		// first split the srcset into its individual sources
		var sources = srcset.replace(/(\s[\d.]+[whx]),/g, '$1 @,@ ').split(' @,@ ');
		// then parse those sources into objects containing the url, width, height and pixel density
		var list = sources.map(function (val) {
			return {
				url: /^\s*(\S*)/.exec(val)[1],
				w: parseFloat((/\S\s+(\d+)w/.exec(val) || [0, Infinity])[1]),
				h: parseFloat((/\S\s+(\d+)h/.exec(val) || [0, Infinity])[1]),
				x: parseFloat((/\S\s+([\d.]+)x/.exec(val) || [0, 1])[1])
			};
		});

		// if there is no items parsed from the srcset then just return the src
		if (!list.length) return src;

		// add the current src into the mix by inspecting the first parsed item to figure out how to handle it
		list.unshift({
			url: src,
			w: list[0].w !== Infinity && list[0].h === Infinity ? srcWidth : Infinity,
			h: list[0].h !== Infinity && list[0].w === Infinity ? srcHeight : Infinity,
			x: 1
		});

		// get the current viewport info and use it to determine the correct src to load
		var dpr = _is.number(devicePixelRatio) ? devicePixelRatio : (window.devicePixelRatio || 1),
			area = {w: renderWidth * dpr, h: renderHeight * dpr, x: dpr},
			props = ['w','h','x'];

		// first check each of the viewport properties against the max values of the same properties in our src array
		// only src's with a property greater than the viewport or equal to the max are kept
		props.forEach(function (prop) {
			var max = Math.max.apply(null, list.map(function (item) {
				return item[prop];
			}));
			list = list.filter(function (item) {
				return item[prop] >= area[prop] || item[prop] === max;
			});
		});

		// next reduce our src array by comparing the viewport properties against the minimum values of the same properties of each src
		// only src's with a property equal to the minimum are kept
		props.forEach(function (prop) {
			var min = Math.min.apply(null, list.map(function (item) {
				return item[prop];
			}));
			list = list.filter(function (item) {
				return item[prop] === min;
			});
		});

		// return the first url as it is the best match for the current viewport
		return list[0].url;
	};

	/**
	 * @summary Get the scroll parent for the supplied element optionally filtering by axis.
	 * @memberof FooFields.utils
	 * @function scrollParent
	 * @param {(string|Element|jQuery)} element - The selector, element or jQuery element to find the scroll parent of.
	 * @param {string} [axis="xy"] - The axis to check. By default this method will check both the X and Y axis.
	 * @param {jQuery} [def] - The default jQuery element to return if no result was found. Defaults to the supplied elements document.
	 * @returns {jQuery}
	 */
	_.scrollParent = function(element, axis, def){
		element = _is.jq(element) ? element : $(element);
		axis = _is.string(axis) && /^(x|y|xy|yx)$/i.test(axis) ? axis : "xy";
		var $doc = $(!!element.length && element[0].ownerDocument || document);
		def = _is.jq(def) ? def : $doc;

		if (!element.length) return def;

		var position = element.css("position"),
			excludeStaticParent = position === "absolute",
			scroll = /(auto|scroll)/i, axisX = /x/i, axisY = /y/i,
			$parent = element.parentsUntil(def).filter(function(i, el){
				var $el = $(this);
				if (excludeStaticParent && $el.css("position") === "static") return false;
				var scrollY = axisY.test(axis) && el.scrollHeight > el.clientHeight && scroll.test($el.css("overflow-y")),
					scrollX = axisX.test(axis) && el.scrollWidth > el.clientWidth && scroll.test($el.css("overflow-x"));
				return scrollY || scrollX;
			}).eq(0);

		if ($parent.is("html")) $parent = $doc;
		return position === "fixed" || !$parent.length ? def : $parent;
	};

})(
	// dependencies
	FooFields.utils.$,
	FooFields.utils,
	FooFields.utils.is
);
(function($, _, _is){
	// only register methods if this version is the current version
	if (_.version !== '0.1.9') return;

	/**
	 * @summary Contains common utility methods and members for the CSS animation property.
	 * @memberof FooFields.utils
	 * @namespace animation
	 */
	_.animation = {};

	function raf(callback){
		return setTimeout(callback, 1);
	}

	function caf(requestID){
		clearTimeout(requestID);
	}

	/**
	 * @summary A cross browser wrapper for the `requestAnimationFrame` method.
	 * @memberof FooFields.utils.animation
	 * @function requestFrame
	 * @param {function} callback - The function to call when it's time to update your animation for the next repaint.
	 * @return {number} - The request id that uniquely identifies the entry in the callback list.
	 */
	_.animation.requestFrame = (window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || raf).bind(window);

	/**
	 * @summary A cross browser wrapper for the `cancelAnimationFrame` method.
	 * @memberof FooFields.utils.animation
	 * @function cancelFrame
	 * @param {number} requestID - The ID value returned by the call to {@link FooFields.utils.animation.requestFrame|requestFrame} that requested the callback.
	 */
	_.animation.cancelFrame = (window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.msCancelAnimationFrame || caf).bind(window);

	// create a test element to check for the existence of the various animation properties
	var testElement = document.createElement('div');

	/**
	 * @summary Whether or not animations are supported by the current browser.
	 * @memberof FooFields.utils.animation
	 * @name supported
	 * @type {boolean}
	 */
	_.animation.supported = (
		/**
		 * @ignore
		 * @summary Performs a one time test to see if animations are supported
		 * @param {HTMLElement} el - An element to test with.
		 * @returns {boolean} `true` if animations are supported.
		 */
		function(el){
			var style = el.style;
			return _is.string(style['animation'])
				|| _is.string(style['WebkitAnimation'])
				|| _is.string(style['MozAnimation'])
				|| _is.string(style['msAnimation'])
				|| _is.string(style['OAnimation']);
		}
	)(testElement);

	/**
	 * @summary The `animationend` event name for the current browser.
	 * @memberof FooFields.utils.animation
	 * @name end
	 * @type {string}
	 * @description Depending on the browser this returns one of the following values:
	 *
	 * <ul><!--
	 * --><li>`"animationend"`</li><!--
	 * --><li>`"webkitAnimationEnd"`</li><!--
	 * --><li>`"msAnimationEnd"`</li><!--
	 * --><li>`"oAnimationEnd"`</li><!--
	 * --><li>`null` - If the browser doesn't support animations</li><!--
	 * --></ul>
	 */
	_.animation.end = (
		/**
		 * @ignore
		 * @summary Performs a one time test to determine which `animationend` event to use for the current browser.
		 * @param {HTMLElement} el - An element to test with.
		 * @returns {?string} The correct `animationend` event for the current browser, `null` if the browser doesn't support animations.
		 */
		function(el){
			var style = el.style;
			if (_is.string(style['animation'])) return 'animationend';
			if (_is.string(style['WebkitAnimation'])) return 'webkitAnimationEnd';
			if (_is.string(style['MozAnimation'])) return 'animationend';
			if (_is.string(style['msAnimation'])) return 'msAnimationEnd';
			if (_is.string(style['OAnimation'])) return 'oAnimationEnd';
			return null;
		}
	)(testElement);

	/**
	 * @summary Gets the `animation-duration` value for the supplied jQuery element.
	 * @memberof FooFields.utils.animation
	 * @function duration
	 * @param {jQuery} $element - The jQuery element to retrieve the duration from.
	 * @param {number} [def=0] - The default value to return if no duration is set.
	 * @returns {number} The value of the `animation-duration` property converted to a millisecond value.
	 */
	_.animation.duration = function($element, def){
		def = _is.number(def) ? def : 0;
		if (!_is.jq($element)) return def;
		// we can use jQuery.css() method to retrieve the value cross browser
		var duration = $element.css('animation-duration');
		if (/^([\d.]*)+?(ms|s)$/i.test(duration)){
			// if we have a valid time value
			var match = duration.match(/^([\d.]*)+?(ms|s)$/i),
				value = parseFloat(match[1]),
				unit = match[2].toLowerCase();
			if (unit === 's'){
				// convert seconds to milliseconds
				value = value * 1000;
			}
			return value;
		}
		return def;
	};

	/**
	 * @summary Gets the `animation-iteration-count` value for the supplied jQuery element.
	 * @memberof FooFields.utils.animation
	 * @function iterations
	 * @param {jQuery} $element - The jQuery element to retrieve the duration from.
	 * @param {number} [def=1] - The default value to return if no iteration count is set.
	 * @returns {number} The value of the `animation-iteration-count` property.
	 */
	_.animation.iterations = function($element, def){
		def = _is.number(def) ? def : 1;
		if (!_is.jq($element)) return def;
		// we can use jQuery.css() method to retrieve the value cross browser
		var iterations = $element.css('animation-iteration-count');
		if (/^(\d+|infinite)$/i.test(iterations)){
			return iterations === "infinite" ? Infinity : parseInt(iterations);
		}
		return def;
	};

	/**
	 * @summary The callback function to execute when starting a animation.
	 * @callback FooFields.utils.animation~startCallback
	 * @param {jQuery} $element - The element to start the animation on.
	 * @this Element
	 */

	/**
	 * @summary Start a animation by toggling the supplied `className` on the `$element`.
	 * @memberof FooFields.utils.animation
	 * @function start
	 * @param {jQuery} $element - The jQuery element to start the animation on.
	 * @param {(string|FooFields.utils.animation~startCallback)} classNameOrFunc - One or more class names (separated by spaces) to be toggled or a function that performs the required actions to start the animation.
	 * @param {boolean} [state] - A Boolean (not just truthy/falsy) value to determine whether the class should be added or removed.
	 * @param {number} [timeout] - The maximum time, in milliseconds, to wait for the `animationend` event to be raised. If not provided this will be automatically set to the elements `animation-duration` multiplied by the `animation-iteration-count` property plus an extra 50 milliseconds.
	 * @returns {Promise}
	 * @description This method lets us use CSS animations by toggling a class and using the `animationend` event to perform additional actions once the animation has completed across all browsers. In browsers that do not support animations this method would behave the same as if just calling jQuery's `.toggleClass` method.
	 *
	 * The last parameter `timeout` is used to create a timer that behaves as a safety net in case the `animationend` event is never raised and ensures the deferred returned by this method is resolved or rejected within a specified time.
	 *
	 * If no `timeout` is supplied the `animation-duration` and `animation-iterations-count` must be set on the `$element` before this method is called so one can be generated.
	 * @see {@link https://developer.mozilla.org/en/docs/Web/CSS/animation-duration|animation-duration - CSS | MDN} for more information on the `animation-duration` CSS property.
	 */
	_.animation.start = function($element, classNameOrFunc, state, timeout){
		var deferred = $.Deferred(), promise = deferred.promise();

		$element = $element.first();

		if (_.animation.supported){
			$element.prop('offsetTop');
			var safety = $element.data('animation_safety');
			if (_is.hash(safety) && _is.number(safety.timer)){
				clearTimeout(safety.timer);
				$element.removeData('animation_safety').off(_.animation.end + '.utils');
				safety.deferred.reject();
			}
			if (!_is.number(timeout)){
				var iterations = _.animation.iterations($element);
				if (iterations === Infinity){
					deferred.reject("No timeout supplied with an infinite animation.");
					return promise;
				}
				timeout = (_.animation.duration($element) * iterations) + 50;
			}
			safety = {
				deferred: deferred,
				timer: setTimeout(function(){
					// This is the safety net in case a animation fails for some reason and the animationend event is never raised.
					// This will remove the bound event and resolve the deferred
					$element.removeData('animation_safety').off(_.animation.end + '.utils');
					deferred.resolve();
				}, timeout)
			};
			$element.data('animation_safety', safety);

			$element.on(_.animation.end + '.utils', function(e){
				if ($element.is(e.target)){
					clearTimeout(safety.timer);
					$element.removeData('animation_safety').off(_.animation.end + '.utils');
					deferred.resolve();
				}
			});
		}

		_.animation.requestFrame(function(){
			if (_is.fn(classNameOrFunc)){
				classNameOrFunc.apply($element.get(0), [$element]);
			} else {
				$element.toggleClass(classNameOrFunc, state);
			}
			if (!_.animation.supported){
				// If the browser doesn't support animations then just resolve the deferred
				deferred.resolve();
			}
		});

		return promise;
	};

})(
	// dependencies
	FooFields.utils.$,
	FooFields.utils,
	FooFields.utils.is
);
(function($, _, _is, _animation){
	// only register methods if this version is the current version
	if (_.version !== '0.1.9') return;

	/**
	 * @summary Contains common utility methods and members for the CSS transition property.
	 * @memberof FooFields.utils
	 * @namespace transition
	 */
	_.transition = {};

	// create a test element to check for the existence of the various transition properties
	var testElement = document.createElement('div');

	/**
	 * @summary Whether or not transitions are supported by the current browser.
	 * @memberof FooFields.utils.transition
	 * @name supported
	 * @type {boolean}
	 */
	_.transition.supported = (
		/**
		 * @ignore
		 * @summary Performs a one time test to see if transitions are supported
		 * @param {HTMLElement} el - An element to test with.
		 * @returns {boolean} `true` if transitions are supported.
		 */
		function(el){
			var style = el.style;
			return _is.string(style['transition'])
				|| _is.string(style['WebkitTransition'])
				|| _is.string(style['MozTransition'])
				|| _is.string(style['msTransition'])
				|| _is.string(style['OTransition']);
		}
	)(testElement);

	/**
	 * @summary The `transitionend` event name for the current browser.
	 * @memberof FooFields.utils.transition
	 * @name end
	 * @type {string}
	 * @description Depending on the browser this returns one of the following values:
	 *
	 * <ul><!--
	 * --><li>`"transitionend"`</li><!--
	 * --><li>`"webkitTransitionEnd"`</li><!--
	 * --><li>`"msTransitionEnd"`</li><!--
	 * --><li>`"oTransitionEnd"`</li><!--
	 * --><li>`null` - If the browser doesn't support transitions</li><!--
	 * --></ul>
	 */
	_.transition.end = (
		/**
		 * @ignore
		 * @summary Performs a one time test to determine which `transitionend` event to use for the current browser.
		 * @param {HTMLElement} el - An element to test with.
		 * @returns {?string} The correct `transitionend` event for the current browser, `null` if the browser doesn't support transitions.
		 */
		function(el){
			var style = el.style;
			if (_is.string(style['transition'])) return 'transitionend';
			if (_is.string(style['WebkitTransition'])) return 'webkitTransitionEnd';
			if (_is.string(style['MozTransition'])) return 'transitionend';
			if (_is.string(style['msTransition'])) return 'msTransitionEnd';
			if (_is.string(style['OTransition'])) return 'oTransitionEnd';
			return null;
		}
	)(testElement);

	/**
	 * @summary Gets the `transition-duration` value for the supplied jQuery element.
	 * @memberof FooFields.utils.transition
	 * @function duration
	 * @param {jQuery} $element - The jQuery element to retrieve the duration from.
	 * @param {number} [def=0] - The default value to return if no duration is set.
	 * @returns {number} The value of the `transition-duration` property converted to a millisecond value.
	 */
	_.transition.duration = function($element, def){
		def = _is.number(def) ? def : 0;
		if (!_is.jq($element)) return def;
		// we can use jQuery.css() method to retrieve the value cross browser
		var duration = $element.css('transition-duration');
		if (/^([\d.]*)+?(ms|s)$/i.test(duration)){
			// if we have a valid time value
			var match = duration.match(/^([\d.]*)+?(ms|s)$/i),
				value = parseFloat(match[1]),
				unit = match[2].toLowerCase();
			if (unit === 's'){
				// convert seconds to milliseconds
				value = value * 1000;
			}
			return value;
		}
		return def;
	};

	/**
	 * @summary The callback function to execute when starting a transition.
	 * @callback FooFields.utils.transition~startCallback
	 * @param {jQuery} $element - The element to start the transition on.
	 * @this Element
	 */

	/**
	 * @summary Start a transition by toggling the supplied `className` on the `$element`.
	 * @memberof FooFields.utils.transition
	 * @function start
	 * @param {jQuery} $element - The jQuery element to start the transition on.
	 * @param {(string|FooFields.utils.transition~startCallback)} classNameOrFunc - One or more class names (separated by spaces) to be toggled or a function that performs the required actions to start the transition.
	 * @param {boolean} [state] - A Boolean (not just truthy/falsy) value to determine whether the class should be added or removed.
	 * @param {number} [timeout] - The maximum time, in milliseconds, to wait for the `transitionend` event to be raised. If not provided this will be automatically set to the elements `transition-duration` property plus an extra 50 milliseconds.
	 * @returns {Promise}
	 * @description This method lets us use CSS transitions by toggling a class and using the `transitionend` event to perform additional actions once the transition has completed across all browsers. In browsers that do not support transitions this method would behave the same as if just calling jQuery's `.toggleClass` method.
	 *
	 * The last parameter `timeout` is used to create a timer that behaves as a safety net in case the `transitionend` event is never raised and ensures the deferred returned by this method is resolved or rejected within a specified time.
	 * @see {@link https://developer.mozilla.org/en/docs/Web/CSS/transition-duration|transition-duration - CSS | MDN} for more information on the `transition-duration` CSS property.
	 */
	_.transition.start = function($element, classNameOrFunc, state, timeout){
		var deferred = $.Deferred(), promise = deferred.promise();

		$element = $element.first();

		if (_.transition.supported){
			$element.prop('offsetTop');
			var safety = $element.data('transition_safety');
			if (_is.hash(safety) && _is.number(safety.timer)){
				clearTimeout(safety.timer);
				$element.removeData('transition_safety').off(_.transition.end + '.utils');
				safety.deferred.reject();
			}
			timeout = _is.number(timeout) ? timeout : _.transition.duration($element) + 50;
			safety = {
				deferred: deferred,
				timer: setTimeout(function(){
					// This is the safety net in case a transition fails for some reason and the transitionend event is never raised.
					// This will remove the bound event and resolve the deferred
					$element.removeData('transition_safety').off(_.transition.end + '.utils');
					deferred.resolve();
				}, timeout)
			};
			$element.data('transition_safety', safety);

			$element.on(_.transition.end + '.utils', function(e){
				if ($element.is(e.target)){
					clearTimeout(safety.timer);
					$element.removeData('transition_safety').off(_.transition.end + '.utils');
					deferred.resolve();
				}
			});
		}

		_animation.requestFrame(function() {
			if (_is.fn(classNameOrFunc)){
				classNameOrFunc.apply($element.get(0), [$element]);
			} else {
				$element.toggleClass(classNameOrFunc, state);
			}
			if (!_.transition.supported){
				// If the browser doesn't support transitions then just resolve the deferred
				deferred.resolve();
			}
		});

		return promise;
	};

})(
	// dependencies
	FooFields.utils.$,
	FooFields.utils,
	FooFields.utils.is,
	FooFields.utils.animation
);
(function ($, _, _is, _obj, _fn) {
	// only register methods if this version is the current version
	if (_.version !== '0.1.9') return;

	/**
	 * @summary A base class providing some helper methods for prototypal inheritance.
	 * @memberof FooFields.utils.
	 * @constructs FooFields.utils.Class
	 * @description This is a base class for making prototypal inheritance simpler to work with. It provides an easy way to inherit from another class and exposes a `_super` method within the scope of any overriding methods that allows a simple way to execute the overridden function.
	 *
	 * Have a look at the {@link FooFields.utils.Class.extend|extend} and {@link FooFields.utils.Class.override|override} method examples to see some basic usage.
	 * @example {@caption When using this base class the actual construction of a class is performed by the `construct` method.}
	 * var MyClass = FooFields.utils.Class.extend({
	 * 	construct: function(arg1, arg2){
	 * 		// handle the construction logic here
	 * 	}
	 * });
	 *
	 * // use the class
	 * var myClass = new MyClass( "arg1:value", "arg2:value" );
	 */
	_.Class = function(){};

	/**
	 * @ignore
	 * @summary The original function when within the scope of an overriding method.
	 * @memberof FooFields.utils.Class#
	 * @name _super
	 * @type {?function}
	 * @description This is only available within the scope of an overriding method if it was created using the {@link FooFields.utils.Class.extend|extend}, {@link FooFields.utils.Class.override|override} or {@link FooFields.utils.fn.addOrOverride} methods.
	 * @see {@link FooFields.utils.fn.addOrOverride} to see an example of how this property is used.
	 */

	/**
	 * @summary Creates a new class that inherits from this one which in turn allows itself to be extended.
	 * @memberof FooFields.utils.Class.
	 * @function extend
	 * @param {Object} [definition] - An object containing any methods to implement/override.
	 * @returns {function} A new class that inherits from the base class.
	 * @description Every class created using this method has both the {@link FooFields.utils.Class.extend|extend} and {@link FooFields.utils.Class.override|override} static methods added to it to allow it to be extended.
	 * @example {@caption The below shows an example of how to implement inheritance using this method.}{@run true}
	 * // create a base Person class
	 * var Person = FooFields.utils.Class.extend({
	 * 	construct: function(isDancing){
	 * 		this.dancing = isDancing;
	 * 	},
	 * 	dance: function(){
	 * 		return this.dancing;
	 * 	}
	 * });
	 *
	 * var Ninja = Person.extend({
	 * 	construct: function(){
	 * 		// Call the inherited version of construct()
	 * 		this._super( false );
	 * 	},
	 * 	dance: function(){
	 * 		// Call the inherited version of dance()
	 * 		return this._super();
	 * 	},
	 * 	swingSword: function(){
	 * 		return true;
	 * 	}
	 * });
	 *
	 * var p = new Person(true);
	 * console.log( p.dance() ); // => true
	 *
	 * var n = new Ninja();
	 * console.log( n.dance() ); // => false
	 * console.log( n.swingSword() ); // => true
	 * console.log(
	 * 	p instanceof Person && p.constructor === Person && p instanceof FooFields.utils.Class
	 * 	&& n instanceof Ninja && n.constructor === Ninja && n instanceof Person && n instanceof FooFields.utils.Class
	 * ); // => true
	 */
	_.Class.extend = function(definition){
		definition = _is.hash(definition) ? definition : {};
		var proto = _obj.create(this.prototype); // create a new prototype to work with so we don't modify the original
		// iterate over all properties in the supplied definition and update the prototype
		for (var name in definition) {
			if (!definition.hasOwnProperty(name)) continue;
			_fn.addOrOverride(proto, name, definition[name]);
		}
		// if no construct method is defined add a default one that does nothing
		proto.construct = _is.fn(proto.construct) ? proto.construct : function(){};

		// create the new class using the prototype made above
		function Class() {
			if (!_is.fn(this.construct))
				throw new SyntaxError('FooFields.utils.Class objects must be constructed with the "new" keyword.');
			this.construct.apply(this, arguments);
		}
		Class.prototype = proto;
		//noinspection JSUnresolvedVariable
		Class.prototype.constructor = _is.fn(proto.__ctor__) ? proto.__ctor__ : Class;
		Class.extend = _.Class.extend;
		Class.override = _.Class.override;
		Class.bases = _.Class.bases;
		Class.__base__ = this;
		return Class;
	};

	/**
	 * @summary Overrides a single method on this class.
	 * @memberof FooFields.utils.Class.
	 * @function override
	 * @param {string} name - The name of the function to override.
	 * @param {function} fn - The new function to override with, the `_super` method will be made available within this function.
	 * @description This is a helper method for overriding a single function of a {@link FooFields.utils.Class} or one of its child classes. This uses the {@link FooFields.utils.fn.addOrOverride} method internally and simply provides the correct prototype.
	 * @example {@caption The below example wraps the `Person.prototype.dance` method with a new one that inverts the result. Note the override applies even to instances of the class that are already created.}{@run true}
	 * var Person = FooFields.utils.Class.extend({
	 *   construct: function(isDancing){
	 *     this.dancing = isDancing;
	 *   },
	 *   dance: function(){
	 *     return this.dancing;
	 *   }
	 * });
	 *
	 * var p = new Person(true);
	 * console.log( p.dance() ); // => true
	 *
	 * Person.override("dance", function(){
	 * 	// Call the original version of dance()
	 * 	return !this._super();
	 * });
	 *
	 * console.log( p.dance() ); // => false
	 */
	_.Class.override = function(name, fn){
		_fn.addOrOverride(this.prototype, name, fn);
	};

	/**
	 * @summary The base class for this class.
	 * @memberof FooFields.utils.Class.
	 * @name __base__
	 * @type {?FooFields.utils.Class}
	 * @private
	 */
	_.Class.__base__ = null;

	/**
	 * @summary Get an array of all base classes for this class.
	 * @memberof FooFields.utils.Class.
	 * @function bases
	 * @returns {FooFields.utils.Class[]}
	 */
	_.Class.bases = function(){
		function _get(klass, result){
			if (!_is.array(result)) result = [];
			if (_is.fn(klass) && klass.__base__ !== null){
				result.unshift(klass.__base__);
				return _get(klass.__base__, result);
			}
			return result;
		}
		var initial = [];
		return _get(this, initial);
	};
})(
	// dependencies
	FooFields.utils.$,
	FooFields.utils,
	FooFields.utils.is,
	FooFields.utils.obj,
	FooFields.utils.fn
);
(function (_, _is, _str) {
    // only register methods if this version is the current version
    if (_.version !== '0.1.9') return;

    _.Event = _.Class.extend(/** @lends FooFields.utils.Event */{
        /**
         * @summary A base event class providing just a type and defaultPrevented properties.
         * @constructs
         * @param {string} type - The type for this event.
         * @description This is a very basic event class that is used internally by the {@link FooFields.utils.EventClass#trigger} method when the first parameter supplied is simply the event name.
         *
         * To trigger your own custom event you will need to inherit from this class and then supply the instantiated event object as the first parameter to the {@link FooFields.utils.EventClass#trigger} method.
         * @example {@caption The following shows how to use this class to create a custom event.}
         * var MyEvent = FooFields.utils.Event.extend({
         * 	construct: function(type, customProp){
         * 	    this._super(type);
         * 	    this.myCustomProp = customProp;
         * 	}
         * });
         *
         * // to use the class you would then instantiate it and pass it as the first argument to a FooFields.utils.EventClass's trigger method
         * var eventClass = ...; // any class inheriting from FooFields.utils.EventClass
         * var event = new MyEvent( "my-event-type", true );
         * eventClass.trigger(event);
         */
        construct: function(type){
            if (_is.empty(type))
                throw new SyntaxError('FooFields.utils.Event objects must be supplied a `type`.');

            var namespaced = _str.contains(type, ".");
            /**
             * @summary The type of event.
             * @memberof FooFields.utils.Event#
             * @name type
             * @type {string}
             * @readonly
             */
            this.type = namespaced ? _str.until(type, ".") : type;
            /**
             * @summary The namespace of the event.
             * @memberof FooFields.utils.Event#
             * @name namespace
             * @type {string}
             * @readonly
             */
            this.namespace = namespaced ? _str.from(type, ".") : null;
            /**
             * @summary Whether the default action should be taken or not.
             * @memberof FooFields.utils.Event#
             * @name defaultPrevented
             * @type {boolean}
             * @readonly
             */
            this.defaultPrevented = false;
            /**
             * @summary The {@link FooFields.utils.EventClass} that triggered this event.
             * @memberof FooFields.utils.Event#
             * @name target
             * @type {FooFields.utils.EventClass}
             * @readonly
             */
            this.target = null;
        },
        /**
         * @summary Informs the class that raised this event that its default action should not be taken.
         * @memberof FooFields.utils.Event#
         * @function preventDefault
         */
        preventDefault: function(){
            this.defaultPrevented = true;
        },
        /**
         * @summary Gets whether the default action should be taken or not.
         * @memberof FooFields.utils.Event#
         * @function isDefaultPrevented
         * @returns {boolean}
         */
        isDefaultPrevented: function(){
            return this.defaultPrevented;
        }
    });

    _.EventClass = _.Class.extend(/** @lends FooFields.utils.EventClass */{
        /**
         * @summary A base class that implements a basic events interface.
         * @constructs
         * @description This is a very basic events implementation that provides just enough to cover most needs.
         */
        construct: function(){
            /**
             * @summary The object used internally to register event handlers.
             * @memberof FooFields.utils.EventClass#
             * @name __handlers
             * @type {Object}
             * @private
             */
            this.__handlers = {};
        },
        /**
         * @summary Destroy the current instance releasing used resources.
         * @memberof FooFields.utils.EventClass#
         * @function destroy
         */
        destroy: function(){
            this.__handlers = {};
        },
        /**
         * @summary Attach multiple event handler functions for one or more events to the class.
         * @memberof FooFields.utils.EventClass#
         * @function on
         * @param {object} events - An object containing an event name to handler mapping.
         * @param {*} [thisArg] - The value of `this` within the `handler` function. Defaults to the `EventClass` raising the event.
         * @returns {this}
         *//**
         * @summary Attach an event handler function for one or more events to the class.
         * @memberof FooFields.utils.EventClass#
         * @function on
         * @param {string} events - One or more space-separated event types.
         * @param {function} handler - A function to execute when the event is triggered.
         * @param {*} [thisArg] - The value of `this` within the `handler` function. Defaults to the `EventClass` raising the event.
         * @returns {this}
         */
        on: function(events, handler, thisArg){
            var self = this;
            if (_is.object(events)){
                thisArg = _is.undef(handler) ? this : handler;
                Object.keys(events).forEach(function(key){
                    key.split(" ").forEach(function(type){
                        self.__on(type, events[key], thisArg);
                    });
                });
            } else if (_is.string(events) && _is.fn(handler)) {
                thisArg = _is.undef(thisArg) ? this : thisArg;
                events.split(" ").forEach(function(type){
                    self.__on(type, handler, thisArg);
                });
            }

            return self;
        },
        __on: function(event, handler, thisArg){
            var self = this,
                namespaced = _str.contains(event, "."),
                type = namespaced ? _str.until(event, ".") : event,
                namespace = namespaced ? _str.from(event, ".") : null;

            if (!_is.array(self.__handlers[type])){
                self.__handlers[type] = [];
            }
            var exists = self.__handlers[type].some(function(h){
                return h.namespace === namespace && h.fn === handler && h.thisArg === thisArg;
            });
            if (!exists){
                self.__handlers[type].push({
                    namespace: namespace,
                    fn: handler,
                    thisArg: thisArg
                });
            }
        },
        /**
         * @summary Remove multiple event handler functions for one or more events from the class.
         * @memberof FooFields.utils.EventClass#
         * @function off
         * @param {object} events - An object containing an event name to handler mapping.
         * @param {*} [thisArg] - The value of `this` within the `handler` function. Defaults to the `EventClass` raising the event.
         * @returns {this}
         *//**
         * @summary Remove an event handler function for one or more events from the class.
         * @memberof FooFields.utils.EventClass#
         * @function off
         * @param {string} events - One or more space-separated event types.
         * @param {function} handler - The handler to remove.
         * @param {*} [thisArg] - The value of `this` within the `handler` function.
         * @returns {this}
         */
        off: function(events, handler, thisArg){
            var self = this;
            if (_is.object(events)){
                thisArg = _is.undef(handler) ? this : handler;
                Object.keys(events).forEach(function(key){
                    key.split(" ").forEach(function(type){
                        self.__off(type, _is.fn(events[key]) ? events[key] : null, thisArg);
                    });
                });
            } else if (_is.string(events)) {
                handler = _is.fn(handler) ? handler : null;
                thisArg = _is.undef(thisArg) ? this : thisArg;
                events.split(" ").forEach(function(type){
                    self.__off(type, handler, thisArg);
                });
            }

            return self;
        },
        __off: function(event, handler, thisArg){
            var self = this,
                type = _str.until(event, ".") || null,
                namespace = _str.from(event, ".") || null,
                types = [];

            if (!_is.empty(type)){
                types.push(type);
            } else if (!_is.empty(namespace)){
                types.push.apply(types, Object.keys(self.__handlers));
            }

            types.forEach(function(type){
                if (!_is.array(self.__handlers[type])) return;
                self.__handlers[type] = self.__handlers[type].filter(function (h) {
                    if (handler != null){
                        return !(h.namespace === namespace && h.fn === handler && h.thisArg === thisArg);
                    }
                    if (namespace != null){
                        return h.namespace !== namespace;
                    }
                    return false;
                });
                if (self.__handlers[type].length === 0){
                    delete self.__handlers[type];
                }
            });
        },
        /**
         * @summary Trigger an event on the current class.
         * @memberof FooFields.utils.EventClass#
         * @function trigger
         * @param {(string|FooFields.utils.Event)} event - Either a space-separated string of event types or a custom event object to raise.
         * @param {Array} [args] - An array of additional arguments to supply to the handlers after the event object.
         * @returns {(FooFields.utils.Event|FooFields.utils.Event[]|null)} Returns the {@link FooFields.utils.Event|event object} of the triggered event. If more than one event was triggered an array of {@link FooFields.utils.Event|event objects} is returned. If no `event` was supplied or triggered `null` is returned.
         */
        trigger: function(event, args){
            args = _is.array(args) ? args : [];
            var self = this, result = [];
            if (event instanceof _.Event){
                result.push(event);
                self.__trigger(event, args);
            } else if (_is.string(event)) {
                event.split(" ").forEach(function(type){
                    var index = result.push(new _.Event(type)) - 1;
                    self.__trigger(result[index], args);
                });
            }
            return _is.empty(result) ? null : (result.length === 1 ? result[0] : result);
        },
        __trigger: function(event, args){
            var self = this;
            event.target = self;
            if (!_is.array(self.__handlers[event.type])) return;
            self.__handlers[event.type].forEach(function (h) {
                if (event.namespace != null && h.namespace !== event.namespace) return;
                h.fn.apply(h.thisArg, [event].concat(args));
            });
        }
    });

})(
    // dependencies
    FooFields.utils,
    FooFields.utils.is,
    FooFields.utils.str
);
(function($, _, _is){
	// only register methods if this version is the current version
	if (_.version !== '0.1.9') return;

	_.Bounds = _.Class.extend(/** @lends FooFields.utils.Bounds */{
		/**
		 * @summary A simple bounding rectangle class.
		 * @constructs
		 * @augments FooFields.utils.Class
		 * @borrows FooFields.utils.Class.extend as extend
		 * @borrows FooFields.utils.Class.override as override
		 */
		construct: function(){
			var self = this;
			self.top = 0;
			self.right = 0;
			self.bottom = 0;
			self.left = 0;
			self.width = 0;
			self.height = 0;
		},
		/**
		 * @summary Inflate the bounds by the specified amount.
		 * @memberof FooFields.utils.Bounds#
		 * @function inflate
		 * @param {number} amount - A positive number will expand the bounds while a negative one will shrink it.
		 * @returns {FooFields.utils.Bounds}
		 */
		inflate: function(amount){
			var self = this;
			if (_is.number(amount)){
				self.top -= amount;
				self.right += amount;
				self.bottom += amount;
				self.left -= amount;
				self.width += amount * 2;
				self.height += amount * 2;
			}
			return self;
		},
		/**
		 * @summary Checks if the supplied bounds object intersects with this one.
		 * @memberof FooFields.utils.Bounds#
		 * @function intersects
		 * @param {FooFields.utils.Bounds} bounds - The bounds to check.
		 * @returns {boolean}
		 */
		intersects: function(bounds){
			var self = this;
			return self.left <= bounds.right && bounds.left <= self.right && self.top <= bounds.bottom && bounds.top <= self.bottom;
		}
	});

	var __$window;
	/**
	 * @summary Gets the bounding rectangle of the current viewport.
	 * @memberof FooFields.utils
	 * @function getViewportBounds
	 * @param {number} [inflate] - An amount to inflate the bounds by. A positive number will expand the bounds outside of the visible viewport while a negative one would shrink it.
	 * @returns {FooFields.utils.Bounds}
	 */
	_.getViewportBounds = function(inflate){
		if (!__$window) __$window = $(window);
		var bounds = new _.Bounds();
		bounds.top = __$window.scrollTop();
		bounds.left = __$window.scrollLeft();
		bounds.width = __$window.width();
		bounds.height = __$window.height();
		bounds.right = bounds.left + bounds.width;
		bounds.bottom = bounds.top + bounds.height;
		bounds.inflate(inflate);
		return bounds;
	};

	/**
	 * @summary Get the bounding rectangle for the supplied element.
	 * @memberof FooFields.utils
	 * @function getElementBounds
	 * @param {(jQuery|HTMLElement|string)} element - The jQuery wrapper around the element, the element itself, or a CSS selector to retrieve the element with.
	 * @returns {FooFields.utils.Bounds}
	 */
	_.getElementBounds = function(element){
		if (!_is.jq(element)) element = $(element);
		var bounds = new _.Bounds();
		if (element.length !== 0){
			var offset = element.offset();
			bounds.top = offset.top;
			bounds.left = offset.left;
			bounds.width = element.width();
			bounds.height = element.height();
		}
		bounds.right = bounds.left + bounds.width;
		bounds.bottom = bounds.top + bounds.height;
		return bounds;
	};

})(
	FooFields.utils.$,
	FooFields.utils,
	FooFields.utils.is
);
(function($, _, _is, _fn, _obj){
    // only register methods if this version is the current version
    if (_.version !== '0.1.9') return;

    _.Timer = _.EventClass.extend(/** @lends FooFields.utils.Timer */{
        /**
         * @summary A simple timer that triggers events.
         * @constructs
         * @param {number} [interval=1000] - The internal tick interval of the timer.
         */
        construct: function(interval){
            this._super();
            /**
             * @summary The internal tick interval of the timer in milliseconds.
             * @memberof FooFields.utils.Timer#
             * @name interval
             * @type {number}
             * @default 1000
             * @readonly
             */
            this.interval = _is.number(interval) ? interval : 1000;
            /**
             * @summary Whether the timer is currently running or not.
             * @memberof FooFields.utils.Timer#
             * @name isRunning
             * @type {boolean}
             * @default false
             * @readonly
             */
            this.isRunning = false;
            /**
             * @summary Whether the timer is currently paused or not.
             * @memberof FooFields.utils.Timer#
             * @name isPaused
             * @type {boolean}
             * @default false
             * @readonly
             */
            this.isPaused = false;
            /**
             * @summary Whether the timer can resume from a previous state or not.
             * @memberof FooFields.utils.Timer#
             * @name canResume
             * @type {boolean}
             * @default false
             * @readonly
             */
            this.canResume = false;
            /**
             * @summary Whether the timer can restart or not.
             * @memberof FooFields.utils.Timer#
             * @name canRestart
             * @type {boolean}
             * @default false
             * @readonly
             */
            this.canRestart = false;
            /**
             * @summary The internal tick timeout ID.
             * @memberof FooFields.utils.Timer#
             * @name __timeout
             * @type {?number}
             * @default null
             * @private
             */
            this.__timeout = null;
            /**
             * @summary Whether the timer is incrementing or decrementing.
             * @memberof FooFields.utils.Timer#
             * @name __decrement
             * @type {boolean}
             * @default false
             * @private
             */
            this.__decrement = false;
            /**
             * @summary The total time for the timer.
             * @memberof FooFields.utils.Timer#
             * @name __time
             * @type {number}
             * @default 0
             * @private
             */
            this.__time = 0;
            /**
             * @summary The remaining time for the timer.
             * @memberof FooFields.utils.Timer#
             * @name __remaining
             * @type {number}
             * @default 0
             * @private
             */
            this.__remaining = 0;
            /**
             * @summary The current time for the timer.
             * @memberof FooFields.utils.Timer#
             * @name __current
             * @type {number}
             * @default 0
             * @private
             */
            this.__current = 0;
            /**
             * @summary The final time for the timer.
             * @memberof FooFields.utils.Timer#
             * @name __finish
             * @type {number}
             * @default 0
             * @private
             */
            this.__finish = 0;
            /**
             * @summary The last arguments supplied to the {@link FooFields.utils.Timer#start|start} method.
             * @memberof FooFields.utils.Timer#
             * @name __restart
             * @type {Array}
             * @default []
             * @private
             */
            this.__restart = [];
        },
        /**
         * @summary Resets the timer back to a fresh starting state.
         * @memberof FooFields.utils.Timer#
         * @function __reset
         * @private
         */
        __reset: function(){
            clearTimeout(this.__timeout);
            this.__timeout = null;
            this.__decrement = false;
            this.__time = 0;
            this.__remaining = 0;
            this.__current = 0;
            this.__finish = 0;
            this.isRunning = false;
            this.isPaused = false;
            this.canResume = false;
        },
        /**
         * @summary Generates event args to be passed to listeners of the timer events.
         * @memberof FooFields.utils.Timer#
         * @function __eventArgs
         * @param {...*} [args] - Any number of additional arguments to pass to an event listener.
         * @return {Array} - The first 3 values of the result will always be the current time, the total time and boolean indicating if the timer is decremental.
         * @private
         */
        __eventArgs: function(args){
            return [
                this.__current,
                this.__time,
                this.__decrement
            ].concat(_fn.arg2arr(arguments));
        },
        /**
         * @summary Performs the tick for the timer checking and modifying the various internal states.
         * @memberof FooFields.utils.Timer#
         * @function __tick
         * @private
         */
        __tick: function(){
            var self = this;
            self.trigger("tick", self.__eventArgs());
            if (self.__current === self.__finish){
                self.trigger("complete", self.__eventArgs());
                self.__reset();
            } else {
                if (self.__decrement){
                    self.__current--;
                } else {
                    self.__current++;
                }
                self.__remaining--;
                self.canResume = self.__remaining > 0;
                self.__timeout = setTimeout(function () {
                    self.__tick();
                }, self.interval);
            }
        },
        /**
         * @summary Starts the timer using the supplied `time` and whether or not to increment or decrement from the value.
         * @memberof FooFields.utils.Timer#
         * @function start
         * @param {number} time - The total time in seconds for the timer.
         * @param {boolean} [decrement=false] - Whether the timer should increment or decrement from or to the supplied time.
         */
        start: function(time, decrement){
            var self = this;
            if (self.isRunning) return;
            decrement = _is.boolean(decrement) ? decrement : false;
            self.__restart = [time, decrement];
            self.__decrement = decrement;
            self.__time = time;
            self.__remaining = time;
            self.__current = decrement ? time : 0;
            self.__finish = decrement ? 0 : time;
            self.canRestart = true;
            self.isRunning = true;
            self.isPaused = false;
            self.trigger("start", self.__eventArgs());
            self.__tick();
        },
        /**
         * @summary Starts the timer counting down to `0` from the supplied `time`.
         * @memberof FooFields.utils.Timer#
         * @function countdown
         * @param {number} time - The total time in seconds for the timer.
         */
        countdown: function(time){
            this.start(time, true);
        },
        /**
         * @summary Starts the timer counting up from `0` to the supplied `time`.
         * @memberof FooFields.utils.Timer#
         * @function countup
         * @param {number} time - The total time in seconds for the timer.
         */
        countup: function(time){
            this.start(time, false);
        },
        /**
         * @summary Stops and then restarts the timer using the last arguments supplied to the {@link FooFields.utils.Timer#start|start} method.
         * @memberof FooFields.utils.Timer#
         * @function restart
         */
        restart: function(){
            this.stop();
            if (this.canRestart){
                this.start.apply(this, this.__restart);
            }
        },
        /**
         * @summary Stops the timer.
         * @memberof FooFields.utils.Timer#
         * @function stop
         */
        stop: function(){
            if (this.isRunning || this.isPaused){
                this.__reset();
                this.trigger("stop", this.__eventArgs());
            }
        },
        /**
         * @summary Pauses the timer and returns the remaining seconds.
         * @memberof FooFields.utils.Timer#
         * @function pause
         * @return {number} - The number of seconds remaining for the timer.
         */
        pause: function(){
            var self = this;
            if (self.__timeout != null){
                clearTimeout(self.__timeout);
                self.__timeout = null;
            }
            if (self.isRunning){
                self.isRunning = false;
                self.isPaused = true;
                self.trigger("pause", self.__eventArgs());
            }
            return self.__remaining;
        },
        /**
         * @summary Resumes the timer from a previously paused state.
         * @memberof FooFields.utils.Timer#
         * @function resume
         */
        resume: function(){
            var self = this;
            if (self.canResume){
                self.isRunning = true;
                self.isPaused = false;
                self.trigger("resume", self.__eventArgs());
                self.__tick();
            }
        },
        /**
         * @summary Resets the timer back to a fresh starting state.
         * @memberof FooFields.utils.Timer#
         * @function reset
         */
        reset: function(){
            this.__reset();
            this.trigger("reset", this.__eventArgs());
        }
    });

})(
    FooFields.utils.$,
    FooFields.utils,
    FooFields.utils.is,
    FooFields.utils.fn,
    FooFields.utils.obj
);

(function($, _, _is, _fn){
	// only register methods if this version is the current version
	if (_.version !== '0.1.9') return;

	_.Factory = _.Class.extend(/** @lends FooFields.utils.Factory */{
		/**
		 * @summary A factory for classes allowing them to be registered and created using a friendly name.
		 * @constructs
		 * @description This class allows other classes to register themselves for use at a later time. Depending on how you intend to use the registered classes you can also specify a load and execution order through the `priority` parameter of the {@link FooFields.utils.Factory#register|register} method.
		 * @augments FooFields.utils.Class
		 * @borrows FooFields.utils.Class.extend as extend
		 * @borrows FooFields.utils.Class.override as override
		 */
		construct: function(){
			/**
			 * @summary An object containing all registered classes.
			 * @memberof FooFields.utils.Factory#
			 * @name registered
			 * @type {Object.<string, Object>}
			 * @readonly
			 * @example {@caption The following shows the structure of this object. The `<name>` placeholders would be the name the class was registered with.}
			 * {
			 * 	"<name>": {
			 * 		"name": <string>,
			 * 		"klass": <function>,
			 * 		"priority": <number>
			 * 	},
			 * 	"<name>": {
			 * 		"name": <string>,
			 * 		"klass": <function>,
			 * 		"priority": <number>
			 * 	},
			 * 	...
			 * }
			 */
			this.registered = {};
		},
		/**
		 * @summary Checks if the factory contains a class registered using the supplied `name`.
		 * @memberof FooFields.utils.Factory#
		 * @function contains
		 * @param {string} name - The name of the class to check.
		 * @returns {boolean}
		 * @example {@run true}
		 * // create a new instance of the factory, this is usually exposed by the class that will be using the factory.
		 * var factory = new FooFields.utils.Factory();
		 *
		 * // create a class to register
		 * function Test(){}
		 *
		 * // register the class with the factory with the default priority
		 * factory.register( "test", Test );
		 *
		 * // test if the class was registered
		 * console.log( factory.contains( "test" ) ); // => true
		 */
		contains: function(name){
			return !_is.undef(this.registered[name]);
		},
		/**
		 * @summary Creates new instances of all registered classes using there registered priority and the supplied arguments.
		 * @memberof FooFields.utils.Factory#
		 * @function load
		 * @param {Object.<string, function>} overrides - An object containing classes to override any matching registered classes with, if no overrides are required you can pass `false` or `null`.
		 * @param {*} arg1 - The first argument to supply when creating new instances of all registered classes.
		 * @param {...*} [argN] - Any number of additional arguments to supply when creating new instances of all registered classes.
		 * @returns {Array.<Object>} An array containing new instances of all registered classes.
		 * @description The class indexes within the result array are determined by the `priority` they were registered with, the higher the `priority` the lower the index.
		 *
		 * This method is designed to be used when all registered classes share a common interface or base type and constructor arguments.
		 * @example {@caption The following loads all registered classes into an array ordered by there priority.}{@run true}
		 * // create a new instance of the factory, this is usually exposed by the class that will be using the factory.
		 * var factory = new FooFields.utils.Factory();
		 *
		 * // create a base Extension class
		 * var Extension = FooFields.utils.Class.extend({
		 * 	construct: function( type, options ){
		 * 		this.type = type;
		 * 		this.options = options;
		 * 	},
		 * 	getType: function(){
		 * 		return this.type;
		 * 	}
		 * });
		 *
		 * // create various item, this would usually be in another file
		 * var MyExtension1 = Extension.extend({
		 * 	construct: function(options){
		 * 		this._super( "my-extension-1", options );
		 * 	}
		 * });
		 * factory.register( "my-extension-1", MyExtension1, 0 );
		 *
		 * // create various item, this would usually be in another file
		 * var MyExtension2 = Extension.extend({
		 * 	construct: function(options){
		 * 		this._super( "my-extension-2", options );
		 * 	}
		 * });
		 * factory.register( "my-extension-2", MyExtension2, 1 );
		 *
		 * // load all registered classes according to there priority passing the options to all constructors
		 * var loaded = factory.load( null, {"something": true} );
		 *
		 * // only two classes should be loaded
		 * console.log( loaded.length ); // => 2
		 *
		 * // the MyExtension2 class is loaded first due to it's priority being higher than the MyExtension1 class.
		 * console.log( loaded[0] instanceof MyExtension2 && loaded[0] instanceof Extension ); // => true
		 * console.log( loaded[1] instanceof MyExtension1 && loaded[1] instanceof Extension ); // => true
		 *
		 * // do something with the loaded classes
		 * @example {@caption The following loads all registered classes into an array ordered by there priority but uses the overrides parameter to swap out one of them for a custom implementation.}{@run true}
		 * // create a new instance of the factory, this is usually exposed by the class that will be using the factory.
		 * var factory = new FooFields.utils.Factory();
		 *
		 * // create a base Extension class
		 * var Extension = FooFields.utils.Class.extend({
		 * 	construct: function( type, options ){
		 * 		this.type = type;
		 * 		this.options = options;
		 * 	},
		 * 	getType: function(){
		 * 		return this.type;
		 * 	}
		 * });
		 *
		 * // create a new extension, this would usually be in another file
		 * var MyExtension1 = Extension.extend({
		 * 	construct: function(options){
		 * 		this._super( "my-extension-1", options );
		 * 	}
		 * });
		 * factory.register( "my-extension-1", MyExtension1, 0 );
		 *
		 * // create a new extension, this would usually be in another file
		 * var MyExtension2 = Extension.extend({
		 * 	construct: function(options){
		 * 		this._super( "my-extension-2", options );
		 * 	}
		 * });
		 * factory.register( "my-extension-2", MyExtension2, 1 );
		 *
		 * // create a custom extension that is not registered but overrides the default "my-extension-1"
		 * var UpdatedMyExtension1 = MyExtension1.extend({
		 * 	construct: function(options){
		 * 		this._super( options );
		 * 		// do something different to the original MyExtension1 class
		 * 	}
		 * });
		 *
		 * // load all registered classes but swaps out the registered "my-extension-1" for the supplied override.
		 * var loaded = factory.load( {"my-extension-1": UpdatedMyExtension1}, {"something": true} );
		 *
		 * // only two classes should be loaded
		 * console.log( loaded.length ); // => 2
		 *
		 * // the MyExtension2 class is loaded first due to it's priority being higher than the UpdatedMyExtension1 class which inherited a priority of 0.
		 * console.log( loaded[0] instanceof MyExtension2 && loaded[0] instanceof Extension ); // => true
		 * console.log( loaded[1] instanceof UpdatedMyExtension1 && loaded[1] instanceof MyExtension1 && loaded[1] instanceof Extension ); // => true
		 *
		 * // do something with the loaded classes
		 */
		load: function(overrides, arg1, argN){
			var self = this,
				args = _fn.arg2arr(arguments),
				reg = [],
				loaded = [],
				name, klass;

			overrides = args.shift() || {};
			for (name in self.registered){
				if (!self.registered.hasOwnProperty(name)) continue;
				var component = self.registered[name];
				if (overrides.hasOwnProperty(name)){
					klass = overrides[name];
					if (_is.string(klass)) klass = _fn.fetch(overrides[name]);
					if (_is.fn(klass)){
						component = {name: name, klass: klass, priority: self.registered[name].priority};
					}
				}
				reg.push(component);
			}

			for (name in overrides){
				if (!overrides.hasOwnProperty(name) || self.registered.hasOwnProperty(name)) continue;
				klass = overrides[name];
				if (_is.string(klass)) klass = _fn.fetch(overrides[name]);
				if (_is.fn(klass)){
					reg.push({name: name, klass: klass, priority: 0});
				}
			}

			reg.sort(function(a, b){ return b.priority - a.priority; });
			$.each(reg, function(i, r){
				if (_is.fn(r.klass)){
					loaded.push(_fn.apply(r.klass, args));
				}
			});
			return loaded;
		},
		/**
		 * @summary Create a new instance of a class registered with the supplied `name` and arguments.
		 * @memberof FooFields.utils.Factory#
		 * @function make
		 * @param {string} name - The name of the class to create.
		 * @param {*} arg1 - The first argument to supply to the new instance.
		 * @param {...*} [argN] - Any number of additional arguments to supply to the new instance.
		 * @returns {Object}
		 * @example {@caption The following shows how to create a new instance of a registered class.}{@run true}
		 * // create a new instance of the factory, this is usually done by the class that will be using it.
		 * var factory = new FooFields.utils.Factory();
		 *
		 * // create a Logger class to register, this would usually be in another file
		 * var Logger = FooFields.utils.Class.extend({
		 * 	write: function( message ){
		 * 		console.log( "Logger#write: " + message );
		 * 	}
		 * });
		 *
		 * factory.register( "logger", Logger );
		 *
		 * // create a new instances of the class registered as "logger"
		 * var logger = factory.make( "logger" );
		 * logger.write( "My message" ); // => "Logger#write: My message"
		 */
		make: function(name, arg1, argN){
			var self = this, args = _fn.arg2arr(arguments), reg;
			name = args.shift();
			reg = self.registered[name];
			if (_is.hash(reg) && _is.fn(reg.klass)){
				return _fn.apply(reg.klass, args);
			}
			return null;
		},
		/**
		 * @summary Gets an array of all registered names.
		 * @memberof FooFields.utils.Factory#
		 * @function names
		 * @param {boolean} [prioritize=false] - Whether or not to order the names by the priority they were registered with.
		 * @returns {Array.<string>}
		 * @example {@run true}
		 * // create a new instance of the factory, this is usually exposed by the class that will be using the factory.
		 * var factory = new FooFields.utils.Factory();
		 *
		 * // create some classes to register
		 * function Test1(){}
		 * function Test2(){}
		 *
		 * // register the classes with the factory with the default priority
		 * factory.register( "test-1", Test1 );
		 * factory.register( "test-2", Test2, 1 );
		 *
		 * // log all registered names
		 * console.log( factory.names() ); // => ["test-1","test-2"]
		 * console.log( factory.names( true ) ); // => ["test-2","test-1"] ~ "test-2" appears before "test-1" as it was registered with a higher priority
		 */
		names: function( prioritize ){
			prioritize = _is.boolean(prioritize) ? prioritize : false;
			var names = [], name;
			if (prioritize){
				var reg = [];
				for (name in this.registered){
					if (!this.registered.hasOwnProperty(name)) continue;
					reg.push(this.registered[name]);
				}
				reg.sort(function(a, b){ return b.priority - a.priority; });
				$.each(reg, function(i, r){
					names.push(r.name);
				});
			} else {
				for (name in this.registered){
					if (!this.registered.hasOwnProperty(name)) continue;
					names.push(name);
				}
			}
			return names;
		},
		/**
		 * @summary Registers a `klass` constructor with the factory using the given `name`.
		 * @memberof FooFields.utils.Factory#
		 * @function register
		 * @param {string} name - The friendly name of the class.
		 * @param {function} klass - The class constructor to register.
		 * @param {number} [priority=0] - This determines the index for the class when using either the {@link FooFields.utils.Factory#load|load} or {@link FooFields.utils.Factory#names|names} methods, a higher value equals a lower index.
		 * @returns {boolean} `true` if the `klass` was successfully registered.
		 * @description Once a class is registered you can use either the {@link FooFields.utils.Factory#load|load} or {@link FooFields.utils.Factory#make|make} methods to create new instances depending on your use case.
		 * @example {@run true}
		 * // create a new instance of the factory, this is usually exposed by the class that will be using the factory.
		 * var factory = new FooFields.utils.Factory();
		 *
		 * // create a class to register
		 * function Test(){}
		 *
		 * // register the class with the factory with the default priority
		 * var succeeded = factory.register( "test", Test );
		 *
		 * console.log( succeeded ); // => true
		 * console.log( factory.registered.hasOwnProperty( "test" ) ); // => true
		 * console.log( factory.registered[ "test" ].name === "test" ); // => true
		 * console.log( factory.registered[ "test" ].klass === Test ); // => true
		 * console.log( factory.registered[ "test" ].priority === 0 ); // => true
		 */
		register: function(name, klass, priority){
			if (!_is.string(name) || _is.empty(name) || !_is.fn(klass)) return false;
			priority = _is.number(priority) ? priority : 0;
			var current = this.registered[name];
			this.registered[name] = {
				name: name,
				klass: klass,
				priority: !_is.undef(current) ? current.priority : priority
			};
			return true;
		}
	});

})(
	// dependencies
	FooFields.utils.$,
	FooFields.utils,
	FooFields.utils.is,
	FooFields.utils.fn
);
(function(_, _fn, _str){
	// only register methods if this version is the current version
	if (_.version !== '0.1.9') return;

	// this is done to handle Content Security in Chrome and other browsers blocking access to the localStorage object under certain configurations.
	// see: https://www.chromium.org/for-testers/bug-reporting-guidelines/uncaught-securityerror-failed-to-read-the-localstorage-property-from-window-access-is-denied-for-this-document
	var localAvailable = false;
	try { localAvailable = !!window.localStorage; }
	catch (err){ localAvailable = false; }

	_.Debugger = _.Class.extend(/** @lends FooFields.utils.Debugger */{
		/**
		 * @summary A debug utility class that can be enabled across sessions using the given `key` by storing its state in `localStorage`.
		 * @constructs
		 * @param {string} key - The key to use to store the debug state in `localStorage`.
		 * @description This class allows you to write additional debug info to the console within your code which by default is not actually output. You can then enable the debugger and it will start to output the results to the console.
		 *
		 * This most useful feature of this is the ability to store the debug state across page sessions by using `localStorage`. This allows you enable the debugger and then refresh the page to view any debugger output that occurs on page load.
		 */
		construct: function(key){
			/**
			 * @summary The key used to store the debug state in `localStorage`.
			 * @memberof FooFields.utils.Debugger#
			 * @name key
			 * @type {string}
			 */
			this.key = key;
			/**
			 * @summary Whether or not the debugger is currently enabled.
			 * @memberof FooFields.utils.Debugger#
			 * @name enabled
			 * @type {boolean}
			 * @readonly
			 * @description The value for this property is synced with the current state stored in `localStorage` and should never set from outside of this class.
			 */
			this.enabled = localAvailable ? !!localStorage.getItem(this.key) : false;
		},
		/**
		 * @summary Enable the debugger causing additional info to be logged to the console.
		 * @memberof FooFields.utils.Debugger#
		 * @function enable
		 * @example
		 * var d = new FooFields.utils.Debugger( "FOO_DEBUG" );
		 * d.log( "Never logged" );
		 * d.enabled();
		 * d.log( "I am logged!" );
		 */
		enable: function(){
			if (!localAvailable) return;
			this.enabled = true;
			localStorage.setItem(this.key, this.enabled);
		},
		/**
		 * @summary Disable the debugger stopping additional info being logged to the console.
		 * @memberof FooFields.utils.Debugger#
		 * @function disable
		 * @example
		 * var d = new FooFields.utils.Debugger( "FOO_DEBUG" );
		 * d.log( "Never logged" );
		 * d.enabled();
		 * d.log( "I am logged!" );
		 * d.disable();
		 * d.log( "Never logged" );
		 */
		disable: function(){
			if (!localAvailable) return;
			this.enabled = false;
			localStorage.removeItem(this.key);
		},
		/**
		 * @summary Logs the supplied message and additional arguments to the console when enabled.
		 * @memberof FooFields.utils.Debugger#
		 * @function log
		 * @param {string} message - The message to log to the console.
		 * @param {*} [argN] - Any number of additional arguments to supply after the message.
		 * @description This method basically wraps the `console.log` method and simply checks the enabled state of the debugger before passing along any supplied arguments.
		 */
		log: function(message, argN){
			if (!this.enabled) return;
			console.log.apply(console, _fn.arg2arr(arguments));
		},
		/**
		 * @summary Logs the formatted message and additional arguments to the console when enabled.
		 * @memberof FooFields.utils.Debugger#
		 * @function logf
		 * @param {string} message - The message containing named `replacements` to log to the console.
		 * @param {Object.<string, *>} replacements - An object containing key value pairs used to perform a named format on the `message`.
		 * @param {*} [argN] - Any number of additional arguments to supply after the message.
		 * @see {@link FooFields.utils.str.format} for more information on supplying the replacements object.
		 */
		logf: function(message, replacements, argN){
			if (!this.enabled) return;
			var args = _fn.arg2arr(arguments);
			message = args.shift();
			replacements = args.shift();
			args.unshift(_str.format(message, replacements));
			this.log.apply(this, args);
		}
	});

})(
	// dependencies
	FooFields.utils,
	FooFields.utils.fn,
	FooFields.utils.str
);
(function($, _, _fn){
    // only register methods if this version is the current version
    if (_.version !== '0.1.9') return;

    _.FullscreenAPI = _.EventClass.extend(/** @lends FooFields.utils.FullscreenAPI */{
        /**
         * @summary A wrapper around the fullscreen API to ensure cross browser compatibility.
         * @constructs
         */
        construct: function(){
            this._super();
            /**
             * @summary An object containing a single browsers various methods and events needed for this wrapper.
             * @typedef {Object} FooFields.utils.FullscreenAPI~BrowserAPI
             * @property {string} enabled
             * @property {string} element
             * @property {string} request
             * @property {string} exit
             * @property {Object} events
             * @property {string} events.change
             * @property {string} events.error
             */

            /**
             * @summary Contains the various browser specific method and event names.
             * @memberof FooFields.utils.FullscreenAPI#
             * @name apis
             * @type {{w3: BrowserAPI, ms: BrowserAPI, moz: BrowserAPI, webkit: BrowserAPI}}
             */
            this.apis = {
                w3: {
                    enabled: "fullscreenEnabled",
                    element: "fullscreenElement",
                    request: "requestFullscreen",
                    exit:    "exitFullscreen",
                    events: {
                        change: "fullscreenchange",
                        error:  "fullscreenerror"
                    }
                },
                webkit: {
                    enabled: "webkitFullscreenEnabled",
                    element: "webkitCurrentFullScreenElement",
                    request: "webkitRequestFullscreen",
                    exit:    "webkitExitFullscreen",
                    events: {
                        change: "webkitfullscreenchange",
                        error:  "webkitfullscreenerror"
                    }
                },
                moz: {
                    enabled: "mozFullScreenEnabled",
                    element: "mozFullScreenElement",
                    request: "mozRequestFullScreen",
                    exit:    "mozCancelFullScreen",
                    events: {
                        change: "mozfullscreenchange",
                        error:  "mozfullscreenerror"
                    }
                },
                ms: {
                    enabled: "msFullscreenEnabled",
                    element: "msFullscreenElement",
                    request: "msRequestFullscreen",
                    exit:    "msExitFullscreen",
                    events: {
                        change: "MSFullscreenChange",
                        error:  "MSFullscreenError"
                    }
                }
            };
            /**
             * @summary The current browsers specific method and event names.
             * @memberof FooFields.utils.FullscreenAPI#
             * @name api
             * @type {?BrowserAPI}
             */
            this.api = this.getAPI();
            /**
             * @summary Whether or not the fullscreen API is supported in the current browser.
             * @memberof FooFields.utils.FullscreenAPI#
             * @name supported
             * @type {boolean}
             */
            this.supported = this.api != null;
            this.__listen();
        },
        /**
         * @summary Destroys the current wrapper unbinding events and freeing up resources.
         * @memberof FooFields.utils.FullscreenAPI#
         * @function destroy
         * @returns {boolean}
         */
        destroy: function(){
            this.__stopListening();
            return this._super();
        },
        /**
         * @summary Fetches the correct API for the current browser.
         * @memberof FooFields.utils.FullscreenAPI#
         * @function getAPI
         * @return {?BrowserAPI} If the fullscreen API is not supported `null` is returned.
         */
        getAPI: function(){
            for (var vendor in this.apis) {
                if (!this.apis.hasOwnProperty(vendor)) continue;
                // Check if document has the "enabled" property
                if (this.apis[vendor].enabled in document) {
                    // It seems this browser supports the fullscreen API
                    return this.apis[vendor];
                }
            }
            return null;
        },
        /**
         * @summary Gets the current fullscreen element or null.
         * @memberof FooFields.utils.FullscreenAPI#
         * @function element
         * @returns {?Element}
         */
        element: function(){
            return this.supported ? document[this.api.element] : null;
        },
        /**
         * @summary Requests the browser to place the specified element into fullscreen mode.
         * @memberof FooFields.utils.FullscreenAPI#
         * @function request
         * @param {Element} element - The element to place into fullscreen mode.
         * @returns {Promise} A Promise which is resolved once the element is placed into fullscreen mode.
         */
        request: function(element){
            if (this.supported && !!element[this.api.request]){
                var result = element[this.api.request]();
                return !result ? $.Deferred(this.__resolver(this.api.request)).promise() : result;
            }
            return _fn.rejected;
        },
        /**
         * @summary Requests that the browser switch from fullscreen mode back to windowed mode.
         * @memberof FooFields.utils.FullscreenAPI#
         * @function exit
         * @returns {Promise} A Promise which is resolved once fullscreen mode is exited.
         */
        exit: function(){
            if (this.supported && !!this.element()){
                var result = document[this.api.exit]();
                return !result ? $.Deferred(this.__resolver(this.api.exit)).promise() : result;
            }
            return _fn.rejected;
        },
        /**
         * @summary Toggles the supplied element between fullscreen and windowed modes.
         * @memberof FooFields.utils.FullscreenAPI#
         * @function toggle
         * @param {Element} element - The element to switch between modes.
         * @returns {Promise} A Promise that is resolved once fullscreen mode is either entered or exited.
         */
        toggle: function(element){
            return !!this.element() ? this.exit() : this.request(element);
        },
        /**
         * @summary Starts listening to the document level fullscreen events and triggers an abbreviated version on this class.
         * @memberof FooFields.utils.FullscreenAPI#
         * @function __listen
         * @private
         */
        __listen: function(){
            var self = this;
            if (!self.supported) return;
            $(document).on(self.api.events.change + ".utils", function() {
                self.trigger("change");
            }).on(self.api.events.error + ".utils", function() {
                self.trigger("error");
            });
        },
        /**
         * @summary Stops listening to the document level fullscreen events.
         * @memberof FooFields.utils.FullscreenAPI#
         * @function __stopListening
         * @private
         */
        __stopListening: function(){
            var self = this;
            if (!self.supported) return;
            $(document).off(self.api.events.change + ".utils")
                .off(self.api.events.error + ".utils");
        },
        /**
         * @summary Creates a resolver function to patch browsers which do not return a Promise from there request and exit methods.
         * @memberof FooFields.utils.FullscreenAPI#
         * @function __resolver
         * @param {string} method - The request or exit method the resolver is being created for.
         * @returns {resolver}
         * @private
         */
        __resolver: function(method){
            var self = this;
            /**
             * @summary Binds to the fullscreen change and error events and resolves or rejects the supplied deferred accordingly.
             * @callback FooFields.utils.FullscreenAPI~resolver
             * @param {jQuery.Deferred} def - The jQuery.Deferred object to resolve.
             */
            return function resolver(def) {
                // Reject the promise if asked to exitFullscreen and there is no element currently in fullscreen
                if (method === self.api.exit && !!self.element()) {
                    setTimeout(function() {
                        def.reject(new TypeError());
                    }, 1);
                    return;
                }

                // When receiving an internal fullscreenchange event, fulfill the promise
                function change() {
                    def.resolve();
                    $(document).off(self.api.events.change, change)
                        .off(self.api.events.error, error);
                }

                // When receiving an internal fullscreenerror event, reject the promise
                function error() {
                    def.reject(new TypeError());
                    $(document).off(self.api.events.change, change)
                        .off(self.api.events.error, error);
                }

                $(document).on(self.api.events.change, change)
                    .on(self.api.events.error, error);
            };
        }
    });

    /**
     * @summary A cross browser wrapper for the fullscreen API.
     * @memberof FooFields.utils
     * @name fullscreen
     * @type {FooFields.utils.FullscreenAPI}
     */
    _.fullscreen = new _.FullscreenAPI();

})(
    FooFields.utils.$,
    FooFields.utils,
    FooFields.utils.fn
);
(function($, _, _utils, _is, _str, _obj){

	/**
	 * @summary Returns the value of the first element in the provided array that satisfies the provided test function.
	 * @memberof FooFields.utils.
	 * @function find
	 * @param {Array} array - The array to search.
	 * @param {FooFields.utils~ArrFindCallback} callback - Function to execute on each value in the array.
	 * @param {*} [thisArg] - Object to use as `this` inside the callback.
	 * @returns {*}
	 */
	_utils.find = function(array, callback, thisArg) {
		if (!_is.array(array) || !_is.fn(callback)) return;
		for (var i = 0, l = array.length; i < l; i++){
			if (callback.call(thisArg, array[i], i, array)){
				return array[i];
			}
		}
	};

	/**
	 * @summary Executed once for each index of the array until it returns a truthy value.
	 * @callback FooFields.utils~ArrFindCallback
	 * @param {*} element - The current element in the array.
	 * @param {number} [index] - The index of the current element in the array.
	 * @param {Array} [array] - The array currently being searched.
	 * @returns {boolean} A truthy value.
	 */

	/**
	 * @summary Strips the `prefix` and/or `suffix from the `target` string.
	 * @memberof FooFields.utils.
	 * @function strip
	 * @param {string} target - The string to strip the prefix and/or suffix from.
	 * @param {string} [prefix=null] - The prefix to remove.
	 * @param {string} [suffix=null] - The suffix to remove.
	 * @returns {string}
	 */
	_utils.strip = function(target, prefix, suffix){
		if (_is.string(target)){
			if (_is.string(prefix) && !_is.empty(prefix) && _str.startsWith(target, prefix)){
				target = _str.from(target, prefix);
			}
			if (_is.string(suffix) && !_is.empty(suffix) && _str.endsWith(target, suffix)){
				target = _str.until(target, suffix);
			}
		}
		return target;
	};

	/**
	 * @summary Exposes the `methods` from the `source` on the `target`.
	 * @memberof FooFields.utils.
	 * @function expose
	 * @param {Object} source - The object to expose methods from.
	 * @param {Object} target - The object to expose methods on.
	 * @param {String[]} methods - An array of method names to expose.
	 */
	_utils.expose = function(source, target, methods){
		if (_is.object(source) && _is.object(target) && _is.array(methods)) {
			methods.forEach(function(method){
				if (_is.string(method) && _is.fn(source[method])){
					target[method] = source[method].bind(source);
				}
			});
		}
	};

})(
	FooFields.$,
	FooFields,
	FooFields.utils,
	FooFields.utils.is,
	FooFields.utils.str,
	FooFields.utils.obj
);
(function($, _, _utils, _is, _obj){

	_.Instance = _utils.EventClass.extend({
		construct: function(){
			var self = this;
			self._super();
			/**
			 * @summary The options for this instance.
			 * @memberof FooFields.Instance#
			 * @name opt
			 * @type {FooFields~Options}
			 */
			self.opt = _obj.extend({}, _.config.opt);
			/**
			 * @summary The CSS classes for this instance.
			 * @memberof FooFields.Instance#
			 * @name cls
			 * @type {FooFields~Classes}
			 */
			self.cls = _obj.extend({}, _.config.cls);
			/**
			 * @summary The i18n for this instance.
			 * @memberof FooFields.Instance#
			 * @name i18n
			 * @type {FooFields~i18n}
			 */
			self.i18n = _obj.extend({}, _.config.i18n);
			/**
			 * @summary The CSS selectors for this instance.
			 * @memberof FooFields.Instance#
			 * @name sel
			 * @type {FooFields~Classes}
			 */
			self.sel = _utils.selectify(self.cls);
			/**
			 * @summary The jQuery document object for this instance.
			 * @memberof FooFields.Instance#
			 * @name $doc
			 * @type {?jQuery}
			 */
			self.$doc = null;
			/**
			 * @summary The MediaQueryList used to determine whether the instance is being displayed on a small screen.
			 * @memberof FooFields.Instance#
			 * @name mqlSmall
			 * @type {?MediaQueryList}
			 */
			self.mqlSmall = null;
			/**
			 * @summary Whether or not the instance is currently being displayed on a small screen.
			 * @memberof FooFields.Instance#
			 * @name small
			 * @type {boolean}
			 */
			self.small = false;
			/**
			 * @summary The MediaQueryList used to determine whether the instance can use hover.
			 * @memberof FooFields.Instance#
			 * @name mqlHoverable
			 * @type {?MediaQueryList}
			 */
			self.mqlHoverable = null;
			/**
			 * @summary Whether or not the instance is currently using hover.
			 * @memberof FooFields.Instance#
			 * @name hoverable
			 * @type {boolean}
			 */
			self.hoverable = false;
			/**
			 * @summary The containers for this instance.
			 * @memberof FooFields.Instance#
			 * @name containers
			 * @type {FooFields.Container[]}
			 */
			self.containers = [];

			// bind the event listeners to ensure we have access back to this instance and can unbind the listeners later
			self.onMqlSmallChanged = self.onMqlSmallChanged.bind(self);
			self.onMqlHoverableChanged = self.onMqlHoverableChanged.bind(self);
		},
		init: function(config){
			var self = this;
			// first parse the config object if one is supplied
			if (_is.hash(config)){
				_obj.extend(self.opt, config.opt);
				_obj.extend(self.i18n, config.i18n);
				if (_is.hash(config.cls)){
					// only check config.cls so we don't selectify more than we need to.
					_obj.extend(self.cls, config.cls);
					self.sel = _utils.selectify(self.cls);
				}
			}
			// now bind any event listeners prior to triggering any events
			if (!_is.empty(self.opt.on)) self.on(self.opt.on, self);
			// initialize all the properties
			self.$doc = $(document);
			self.mqlSmall = window.matchMedia("(max-width: " + self.opt.small + "px)");
			self.mqlHoverable = window.matchMedia("(hover: hover)");
			self.small = self.mqlSmall.matches;
			self.hoverable = self.mqlHoverable.matches;
			self.containers = $(self.sel.container.el).map(function(i, el){
				return new _.Container(self, el);
			}).get();

			self.trigger("init", [self]);

			self.containers.forEach(function(ctnr){
				ctnr.init();
			});

			// noinspection JSDeprecatedSymbols
			self.mqlSmall.addListener(self.onMqlSmallChanged);
			// noinspection JSDeprecatedSymbols
			self.mqlHoverable.addListener(self.onMqlHoverableChanged);

			self.trigger("ready", [self]);
		},
		destroy: function(){
			var self = this;
			self.trigger("destroy", [self]);

			// noinspection JSDeprecatedSymbols
			self.mqlSmall.removeListener(self.onMqlSmallChanged);
			// noinspection JSDeprecatedSymbols
			self.mqlHoverable.removeListener(self.onMqlHoverableChanged);

			self.containers.forEach(function(ctnr){
				ctnr.destroy();
			});

			if (!_is.empty(self.opt.on)) self.off(self.opt.on, self);

			self._super();
		},
		/**
		 * @summary Get a field by ID.
		 * @memberof FooFields.Instance#
		 * @function field
		 * @param {string} id - The ID of the field to find.
		 * @returns {FooFields.Field}
		 */
		field: function(id){
			var self = this, field;
			for (var i = 0, l = self.containers.length; i < l; i++){
				field = self.containers[i].field(id);
				if (field instanceof _.Field) return field;
			}
		},
		/**
		 * @summary Get a content by ID.
		 * @memberof FooFields.Instance#
		 * @function content
		 * @param {string} id - The ID of the content to find.
		 * @returns {FooFields.Content}
		 */
		content: function(id){
			var self = this, content;
			for (var i = 0, l = self.containers.length; i < l; i++){
				content = self.containers[i].content(id);
				if (content instanceof _.Content) return content;
			}
		},
		/**
		 * @summary Get a container by ID.
		 * @memberof FooFields.Instance#
		 * @function container
		 * @param {string} id - The ID of the container to find.
		 * @returns {FooFields.Container}
		 */
		container: function(id){
			var self = this;
			if (_is.string(id)){
				id = _utils.strip(id, "#");
				return _utils.find(self.containers, function(container){
					return container.id === id;
				});
			}
		},
		/**
		 * @summary Listens for the small screen MediaQueryList changed event.
		 * @memberof FooFields.Instance#
		 * @function onMqlSmallChanged
		 * @param {MediaQueryListEvent} mqlEvent - The event object for the change.
		 */
		onMqlSmallChanged: function(mqlEvent){
			var self = this;
			/**
			 * @summary Raised when changing between being a small screen or not.
			 * @event FooFields.Instance~"small-changed"
			 * @type {FooFields.utils.Event}
			 * @param {FooFields.utils.Event} event - The event object.
			 * @param {FooFields.Instance} instance - The instance raising the event.
			 * @param {boolean} state - Whether or not the screen is small.
			 */
			self.trigger("small-changed", [self, (self.small = mqlEvent.matches)]);
		},
		/**
		 * @summary Listens for the hover MediaQueryList changed event.
		 * @memberof FooFields.Instance#
		 * @function onMqlHoverableChanged
		 * @param {MediaQueryListEvent} mqlEvent - The event object for the change.
		 */
		onMqlHoverableChanged: function(mqlEvent){
			var self = this;
			/**
			 * @summary Raised when hover changes between being supported or not.
			 * @event FooFields.Instance~"hoverable-changed"
			 * @type {FooFields.utils.Event}
			 * @param {FooFields.utils.Event} event - The event object.
			 * @param {FooFields.Instance} instance - The instance raising the event.
			 * @param {boolean} state - Whether or not hover is supported.
			 */
			self.trigger("hoverable-changed", [self, (self.hoverable = mqlEvent.matches)]);
		}
	});

})(
	FooFields.$,
	FooFields,
	FooFields.utils,
	FooFields.utils.is,
	FooFields.utils.obj
);
(function($, _, _utils, _is){

	_.Component = _utils.EventClass.extend({
		construct: function(instance, element, classes, selectors){
			var self = this;
			self._super();
			/**
			 * @summary The parent instance for this component.
			 * @memberof FooFields.Component#
			 * @name instance
			 * @type {FooFields.Component}
			 */
			self.instance = instance;
			/**
			 * @summary The jQuery element object for this component.
			 * @memberof FooFields.Component#
			 * @name $el
			 * @type {string}
			 */
			self.$el = _is.jq(element) ? element : $(element);
			/**
			 * @summary The CSS classes for this component.
			 * @memberof FooFields.Component#
			 * @name cls
			 * @type {Object}
			 */
			self.cls = classes;
			/**
			 * @summary The CSS selectors for this component.
			 * @memberof FooFields.Component#
			 * @name sel
			 * @type {Object}
			 */
			self.sel = selectors;
		},
		init: function(){},
		destroy: function(){
			this._super();
		}
	});

	_.CtnrComponent = _.Component.extend({
		construct: function(instance, ctnr, element, classes, selectors){
			var self = this;
			self._super(instance, element, classes, selectors);
			/**
			 * @summary The parent container for this component.
			 * @memberof FooFields.CtnrComponent#
			 * @name ctnr
			 * @type {FooFields.Container}
			 */
			self.ctnr = ctnr;
		}
	});

})(
	FooFields.$,
	FooFields,
	FooFields.utils,
	FooFields.utils.is
);
(function($, _, _utils, _is, _obj){

	/**
	 * @class FooFields.Container
	 */
	_.Container = _.Component.extend(/** @lends FooFields.Container */{
		/**
		 * @summary This class is used by the rest of the plugin to perform certain global checks.
		 * @memberof FooFields.Container#
		 * @constructs
		 * @param {FooFields.Instance} instance - The parent instance for this container.
		 * @param {(string|jQuery|Element)} element - The element for this container.
		 * @augments FooFields.Component
		 * @borrows FooFields.utils.Class.extend as extend
		 * @borrows FooFields.utils.Class.override as override
		 */
		construct: function(instance, element){
			var self = this;
			// noinspection JSValidateTypes
			self._super(instance, element, instance.cls.container, instance.sel.container);

			self.contents = self.$el.children(self.sel.content.el).map(function(i, el){
				return new _.Content(self, el);
			}).get();

			self.tabs = self.$el.children(self.sel.tabs.el)
				.children(self.sel.tabs.tab.el)
				.map(function(i, el){
					return new _.Tab(self, el, i);
				}).get();
		},
		/**
		 * @summary Init the container raising events.
		 * @memberof FooFields.Container#
		 * @function init
		 */
		init: function(){
			var self = this, active = null;

			self.$el.toggleClass(self.cls.tabs.exists, self.tabs.length > 0);
			self.setSmall(self.instance.small);
			self.setHoverable(self.instance.hoverable);

			self.contents.forEach(function (content) {
				content.init();
				if (active === null && content.active) active = content;
			});
			self.tabs.forEach(function(tab){
				tab.init();
			});

			if (active === null && self.contents.length > 0) active = self.contents[0];
			if (active instanceof _.Content) self.activate(active.id);

			self.instance.on({
				"small-changed": self.onSmallChanged,
				"hoverable-changed": self.onHoverableChanged
			}, self);
		},
		/**
		 * @summary Destroy the container raising events.
		 * @memberof FooFields.Container#
		 * @function destroy
		 */
		destroy: function(){
			var self = this;

			self.instance.off({
				"small-changed": self.onSmallChanged,
				"hoverable-changed": self.onHoverableChanged
			}, self);

			self.$el.removeClass(self.cls.tabs.exists);
			self.tabs.forEach(function(tab){
				tab.destroy();
			});
			self.contents.forEach(function (content) {
				content.destroy();
			});
		},
		activate: function(id){
			var self = this;
			self.tabs.forEach(function(tab){
				tab.activate(id);
			});
			self.contents.forEach(function (content) {
				content.activate(id);
			});
		},
		field: function(id){
			var self = this, field;
			for (var i = 0, l = self.contents.length; i < l; i++){
				field = self.contents[i].field(id);
				if (field instanceof _.Field) return field;
			}
		},
		content: function(id){
			var self = this;
			if (_is.string(id)){
				id = _utils.strip(id, "#");
				return _utils.find(self.contents, function(content){
					return content.id === id;
				});
			}
		},
		/**
		 * @summary Sets the small screen state for this container.
		 * @memberof FooFields.Container#
		 * @function setSmall
		 * @param {boolean} state - Whether or not this is a small screen.
		 */
		setSmall: function(state){
			var self = this;
			self.$el.toggleClass(self.instance.cls.small, !!state);
		},
		/**
		 * @summary Sets the hoverable state for this container.
		 * @memberof FooFields.Container#
		 * @function setHoverable
		 * @param {boolean} state - Whether or not this is a small screen.
		 */
		setHoverable: function(state){
			var self = this;
			self.$el.toggleClass(self.instance.cls.hoverable, !!state);
		},
		/**
		 * @summary Listens for the `small-changed` event.
		 * @memberof FooFields.Container#
		 * @function onSmallChanged
		 * @param {FooFields.utils.Event} e - The event object for the change.
		 * @param {FooFields.Instance} instance - The instance raising the event.
		 * @param {boolean} state - Whether or not the screen is small.
		 */
		onSmallChanged: function(e, instance, state){
			this.setSmall(state);
		},
		/**
		 * @summary Listens for the `hoverable-changed` event.
		 * @memberof FooFields.Container#
		 * @function onHoverableChanged
		 * @param {FooFields.utils.Event} e - The event object for the change.
		 * @param {FooFields.Instance} instance - The instance raising the event.
		 * @param {boolean} state - Whether or not hover is supported.
		 */
		onHoverableChanged: function(e, instance, state){
			this.setHoverable(state);
		}
	});

})(
	FooFields.$,
	FooFields,
	FooFields.utils,
	FooFields.utils.is,
	FooFields.utils.obj
);
(function($, _, _utils, _is){

	_.Content = _.CtnrComponent.extend({
		construct: function(ctnr, el){
			var self = this;
			self._super(ctnr.instance, ctnr, el, ctnr.cls.content, ctnr.sel.content);
			self.id = self.$el.attr("id");
			self.active = self.$el.hasClass(self.instance.cls.active);
			self.fields = self.$el.children(self.sel.field).map(function(i, el){
				return _.fields.create(self, el);
			}).get();
		},
		init: function(){
			var self = this;
			self.$el.toggleClass(self.instance.cls.active, self.active);
			self.fields.forEach(function(field){
				field.init();
			});
		},
		destroy: function(){
			var self = this;
			self.fields.forEach(function(field){
				field.destroy();
			});
		},
		activate: function(id){
			var self = this;
			self.$el.toggleClass(self.instance.cls.active, (self.active = self.id === id));
		},
		field: function(id){
			return _utils.find(this.fields, function(field){
				return field.id === id;
			});
		}
	});


})(
	FooFields.$,
	FooFields,
	FooFields.utils,
	FooFields.utils.is
);
(function($, _, _utils, _is, _obj){

	_.Fields = _utils.Factory.extend(/** @lends FooFields.Fields */{
		/**
		 * @summary A factory for tables allowing them to be easily registered and created.
		 * @memberof FooFields.
		 * @constructs Fields
		 * @description The plugin makes use of an instance of this class exposed as {@link FooFields.fields}.
		 * @augments FooFields.utils.Factory
		 * @borrows FooFields.utils.Class.extend as extend
		 * @borrows FooFields.utils.Class.override as override
		 */
		construct: function () {
			/**
			 * @summary An object containing all registered tables.
			 * @memberof FooFields.Fields#
			 * @name registered
			 * @type {Object.<string, Object>}
			 * @readonly
			 * @example {@caption The following shows the structure of this object. The `<name>` placeholders would be the name the class was registered with.}
			 * {
			 * 	"<name>": {
			 * 		"name": <string>,
			 * 		"klass": <function>,
			 * 		"selector": <string>,
			 * 		"options": <object>,
			 * 		"classes": <object>,
			 * 		"i18n": <object>,
			 * 		"priority": <number>
			 * 	},
			 * 	"<name>": {
			 * 		"name": <string>,
			 * 		"klass": <function>,
			 * 		"selector": <string>,
			 * 		"options": <object>,
			 * 		"classes": <object>,
			 * 		"i18n": <object>,
			 * 		"priority": <number>
			 * 	},
			 * 	...
			 * }
			 */
			this.registered = {};
		},
		register: function(name, klass, selector, options, classes, i18n, priority){
			var self = this;
			if (!_is.string(selector)) return false;
			if (self._super(name, klass, priority)){
				var reg = self.registered[name];
				reg.selector = selector;
				reg.options = _is.hash(options) ? options : {};
				reg.classes = _is.hash(classes) ? classes : {};
				reg.i18n = _is.hash(i18n) ? i18n : {};
				return true;
			}
			return false;
		},
		make: function(name, content, element, options){
			var self = this, reg = self.registered[name], i18n = {}, classes = {};
			if (_is.hash(reg)){

				var inst = content.ctnr.instance,
					regBases = self.bases(name),
					ext_options = [{}],
					ext_classes = [{}],
					ext_i18n = [{}];

				regBases.push(self.registered[name]);
				regBases.push({
					options: inst.opt.fields[name],
					classes: inst.cls.fields[name],
					i18n: inst.i18n.fields[name]
				});

				regBases.forEach(function(reg){
					ext_options.push(reg.options);
					ext_classes.push(reg.classes);
					ext_i18n.push(reg.i18n);
				});

				ext_options.push(options);
				ext_classes.push(classes);
				ext_i18n.push(i18n);

				options = _obj.extend.apply(_obj, ext_options);
				classes = _obj.extend.apply(_obj, ext_classes);
				i18n = _obj.extend.apply(_obj, ext_i18n);

				return self._super(name, content, element, options, classes, i18n);
			}
			return null;
		},
		create: function(content, element, options){
			var self = this, name;

			element = _is.jq(element) ? element : $(element);
			// merge the options with any supplied using data attributes
			options = _obj.extend({}, options, element.data());

			for (name in self.registered){
				if (!self.registered.hasOwnProperty(name) || name === "field" || !element.is(self.registered[name].selector)) continue;
				return self.make(name, content, element, options);
			}
			return self.make("field", content, element, options);
		},
		/**
		 * @summary Get all registered base fields for the supplied name.
		 * @memberof FooFields.Fields#
		 * @function bases
		 * @param {string} name - The name of the field to get the bases for.
		 * @returns {Object[]}
		 */
		bases: function(name){
			if (!this.contains(name)) return [];
			var self = this,
				reg = self.registered[name],
				bases = reg.klass.bases(),
				result = [];
			bases.forEach(function(base){
				var found = self.find(base);
				if (found !== null){
					result.push(found);
				}
			});
			return result;
		},
		/**
		 * @summary Given the class this method attempts to find its registered values.
		 * @memberof FooFields.Fields#
		 * @function find
		 * @param {FooFields.Field} klass - The class to find.
		 * @returns {(Object|null)}
		 */
		find: function(klass){
			var name, reg = this.registered;
			for (name in reg){
				if (!reg.hasOwnProperty(name) || reg[name].klass !== klass) continue;
				return reg[name];
			}
			return null;
		}
	});

	_.fields = new _.Fields();

})(
	FooFields.$,
	FooFields,
	FooFields.utils,
	FooFields.utils.is,
	FooFields.utils.obj
);
(function($, _, _utils, _is){

	_.Field = _.CtnrComponent.extend({
		construct: function(content, element, options, classes, i18n){
			var self = this;
			self._super(content.instance, content.ctnr, element, classes, _utils.selectify(classes));
			self.content = content;
			self.opt = options;
			self.i18n = i18n;
			self.id = self.$el.attr("id");
			self.$label = self.$el.children(self.sel.label);
			self.$input = self.$el.children(self.sel.input);
			self.$change = self.$el.find(self.opt.changeSelector);
			self.$value = self.$el.find(self.opt.valueSelector);
			self.visible = !self.opt.hidden;
			self._showWhenField = null;
		},
		init: function(){
			var self = this;
			self.setup();
			self.$change.on("change.foofields", {self: self}, self.onValueChanged);
			self.setupVisibilityRules();
			self.trigger("init", [self]);
		},
		setup: function(){},
		setupVisibilityRules: function(){
			var self = this;
			self.toggle(self.visible);
			if (self.opt.showWhenField !== null){
				var field = self.instance.field(self.opt.showWhenField);
				if (field instanceof _.Field){
					self._showWhenField = field;
					self._showWhenField.on("change", self.onShowWhenFieldChanged, self);
				}
			}
		},
		destroy: function(){
			var self = this;
			self.trigger("destroy", [self]);
			self.$change.off("change.foofields", self.onValueChanged);
			self.teardownVisibilityRules();
			self.teardown();
		},
		teardown: function(){},
		teardownVisibilityRules: function(){
			var self = this;
			if (self._showWhenField instanceof _.Field){
				self._showWhenField.off("change", self.onShowWhenFieldChanged, self);
			}
		},
		toggle: function(state){
			var self = this;
			self.visible = _is.boolean(state) ? state : !self.visible;
			self.$el.toggleClass(self.instance.cls.hidden, !self.visible)
				.find(":input").attr("disabled", !self.visible);
		},
		val: function(){
			var self = this;
			return self.opt.valueAttribute !== null ? self.$value.attr(self.opt.valueAttribute) : self.$value.val();
		},
		onValueChanged: function(e){
			var self = e.data.self;
			self.trigger("change", [self.val(), self]);
		},
		onShowWhenFieldChanged: function(e, value){
			var self = this, testValue = self.opt.showWhenValue, visible;
			switch (self.opt.showWhenOperator) {
				case "!==":
					visible = value !== testValue;
					break;
				case "regex":
					visible = new RegExp(testValue).test(value);
					break;
				case "indexOf":
					visible = value.indexOf(testValue) !== -1;
					break;
				default:
					visible = value === testValue;
					break;
			}
			self.toggle(visible);
		}
	});

	_.fields.register("field", _.Field, ".foofields-field", {
		// options
		hidden: false,
		showWhenField: null,
		showWhenValue: null,
		showWhenOperator: null,
		changeSelector: ":input",
		valueSelector: ":input",
		valueAttribute: null
	}, {
		el: "foofields-field",
		label: "foofields-label",
		input: "foofields-field-input"
	}, {
		// i18n
	});

})(
	FooFields.$,
	FooFields,
	FooFields.utils,
	FooFields.utils.is
);
(function($, _, _utils, _is, _obj){

	_.Tab = _.CtnrComponent.extend({
		construct: function(ctnr, el, index){
			var self = this;
			self._super(ctnr.instance, ctnr, el, ctnr.cls.tabs.tab, ctnr.sel.tabs.tab);
			self.index = index;

			self.$link = self.$el.children(self.sel.link).first();
			self.$icon = self.$link.children(self.sel.icon).first();
			self.$text = self.$link.children(self.sel.text).first();

			self.target = _utils.strip(self.$link.attr("href"), "#");
			self.active = self.$el.hasClass(self.instance.cls.active);

			self.menu = new _.TabMenu(self, self.$el.children(self.sel.menu.el));
		},
		init: function(){
			var self = this;
			self.$el.toggleClass(self.instance.cls.first, self.index === 0)
				.toggleClass(self.instance.cls.last, self.index === self.ctnr.tabs.length - 1);
			self.$link.on("click.foofields", {self: self}, self.onLinkClick);
			self.menu.init();
		},
		destroy: function(){
			var self = this;
			self.$el.removeClass(self.instance.cls.first)
				.removeClass(self.instance.cls.last);
			self.$link.off(".foofields");
			self.menu.destroy();
		},
		handles: function(id){
			var self = this;
			return self.target === id || self.menu.handles(id);
		},
		activate: function(id){
			var self = this;
			self.$el.toggleClass(self.instance.cls.active, (self.active = self.handles(id)));
			if (self.menu.exists) self.menu.activate(id);
		},
		onLinkClick: function(e){
			e.preventDefault();
			e.stopPropagation();
			var self = e.data.self;
			if (self.menu.exists && self.instance.small && !self.instance.hoverable){
				self.menu.toggle();
			} else {
				self.ctnr.activate(self.target);
			}
		}
	});

})(
	FooFields.$,
	FooFields,
	FooFields.utils,
	FooFields.utils.is,
	FooFields.utils.obj
);
(function($, _, _utils, _is){

	_.TabMenu = _.CtnrComponent.extend({
		construct: function(tab, el){
			var self = this;
			self._super(tab.instance, tab.ctnr, el, tab.cls.menu, tab.sel.menu);
			self.tab = tab;
			self.$header = $("<li/>", {"class": self.cls.header}).append(tab.$text.clone());
			self.items = self.$el.children(self.sel.item.el).map(function(i, el){
				return new _.TabMenuItem(self, el, i);
			}).get();

			self.exists = self.items.length > 0;
			self.visible = tab.$el.hasClass(self.cls.visible);

			self._enter = null;
			self._leave = null;

			self.onDocumentClick = self.onDocumentClick.bind(self);
			self.onTabMouseEnter = self.onTabMouseEnter.bind(self);
			self.onTabMouseLeave = self.onTabMouseLeave.bind(self);
		},
		init: function(){
			var self = this;
			if (!self.exists) return;

			self.tab.$el.addClass(self.cls.exists);

			self.items.forEach(function(item){
				item.init();
			});

			self.setSmall(self.instance.small);
			self.setHoverable(self.instance.hoverable);

			self.instance.on({
				"small-changed": self.onSmallChanged,
				"hoverable-changed": self.onHoverableChanged
			}, self);
		},
		destroy: function(){
			var self = this;
			if (!self.exists) return;

			self.instance.off({
				"small-changed": self.onSmallChanged,
				"hoverable-changed": self.onHoverableChanged
			}, self);

			self.toggle(false);
			self.setSmall(false);
			self.setHoverable(false);

			self.tab.$el.removeClass(self.cls.exists);
			self.items.forEach(function(item){
				item.destroy();
			});
		},
		toggle: function(visible){
			var self = this;
			if (!self.exists) return;
			self.visible = !_is.undef(visible) ? !!visible : !self.visible;
			self.tab.$el.toggleClass(self.cls.visible, self.visible);
			self.ctnr.$el.children(self.ctnr.cls.tabs.el).toggleClass(self.cls.visible, self.visible);
			if (self.visible){
				self.instance.$doc.on("click.foofields", self.onDocumentClick);
			} else {
				self.instance.$doc.off("click.foofields", self.onDocumentClick);
			}
		},
		item: function(id){
			if (!this.exists) return;
			return _utils.find(this.items, function(item){
				return item.target === id;
			});
		},
		handles: function(id){
			return this.item(id) instanceof _.TabMenuItem;
		},
		activate: function(id){
			var self = this;
			if (!self.exists) return;
			self.items.forEach(function(item){
				item.activate(id);
			});
		},
		setSmall: function(state){
			var self = this;
			if (state){
				self.$el.prepend(self.$header);
			} else {
				self.$header.remove();
			}
		},
		setHoverable: function(state){
			var self = this;
			if (state){
				self.tab.$el.on({
					"mouseenter.foofields": self.onTabMouseEnter,
					"mouseleave.foofields": self.onTabMouseLeave
				});
			} else  {
				self.tab.$el.off({
					"mouseenter.foofields": self.onTabMouseEnter,
					"mouseleave.foofields": self.onTabMouseLeave
				});
				clearTimeout(self._enter);
				clearTimeout(self._leave);
				self._enter = null;
				self._leave = null;
			}
		},

		//region Listeners
		/**
		 * @summary Listens for the `small-changed` event.
		 * @memberof FooFields.TabMenu#
		 * @function onSmallChanged
		 * @param {FooFields.utils.Event} e - The event object for the change.
		 * @param {FooFields.Instance} instance - The instance raising the event.
		 * @param {boolean} state - Whether or not the screen is small.
		 */
		onSmallChanged: function(e, instance, state){
			this.setSmall(state);
		},
		/**
		 * @summary Listens for the `hoverable-changed` event.
		 * @memberof FooFields.TabMenu#
		 * @function onHoverableChanged
		 * @param {FooFields.utils.Event} e - The event object for the change.
		 * @param {FooFields.Instance} instance - The instance raising the event.
		 * @param {boolean} state - Whether or not hover is supported.
		 */
		onHoverableChanged: function(e, instance, state){
			this.setHoverable(state);
		},
		//endregion

		//region Listeners
		onDocumentClick: function(){
			this.toggle(false);
		},
		onTabMouseEnter: function(){
			var self = this;
			clearTimeout(self._leave);
			self._leave = null;
			if (self._enter === null){
				self._enter = setTimeout(function(){
					self.toggle(true);
					self._enter = null;
				}, 300);
			}
		},
		onTabMouseLeave: function(){
			var self = this;
			clearTimeout(self._enter);
			self._enter = null;
			if (self._leave === null){
				self._leave = setTimeout(function(){
					self.toggle(false);
					self._leave = null;
				}, 300);
			}
		}
		//endregion
	});


})(
	FooFields.$,
	FooFields,
	FooFields.utils,
	FooFields.utils.is
);
(function($, _, _utils, _is){

	_.TabMenuItem = _.CtnrComponent.extend({
		construct: function(menu, el, index){
			var self = this;
			self._super(menu.instance, menu.ctnr, el, menu.cls.item, menu.sel.item);
			self.menu = menu;
			self.index = index;
			self.active = self.$el.hasClass(self.instance.cls.active);
			self.$link = self.$el.children(self.sel.link).first();
			self.$text = self.$link.children(self.sel.text).first();
			self.target = _utils.strip(self.$link.attr("href"), "#");
		},
		init: function(){
			var self = this;
			self.$el.toggleClass(self.instance.cls.first, self.index === 0)
				.toggleClass(self.instance.cls.last, self.index === self.menu.items.length - 1);
			self.$link.on("click.foofields", {self: self}, self.onLinkClick);
		},
		destroy: function(){
			var self = this;
			self.$el.removeClass(self.instance.cls.first)
				.removeClass(self.instance.cls.last);
			self.$link.off(".foofields");
		},
		activate: function(id){
			var self = this;
			self.$el.toggleClass(self.instance.cls.active, (self.active = self.target === id));
		},
		onLinkClick: function(e){
			e.preventDefault();
			e.stopPropagation();
			var self = e.data.self;
			self.ctnr.activate(self.target);
		}
	});


})(
	FooFields.$,
	FooFields,
	FooFields.utils,
	FooFields.utils.is
);
(function($, _, _utils, _is, _obj){

	_.__instance__ = new _.Instance();

	_utils.expose(_.__instance__, _, ["on","off","trigger","init","destroy","field"]);

	_utils.ready(function(){
		_.__instance__.init(window.FOOFIELDS);
	});

})(
	FooFields.$,
	FooFields,
	FooFields.utils,
	FooFields.utils.is,
	FooFields.utils.obj
);