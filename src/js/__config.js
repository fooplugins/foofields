(function($, _){

	/**
	 * @summary The default configuration for the FooFields plugin.
	 * @memberof FooFields.
	 * @name config
	 * @type {FooFields~Config}
	 */
	_.config = {
		opt: {
			smallScreen: 960,
			smallField: 320,
			on: {},
			fields: {}
		},
		cls: {
			small: "foofields-small",
			hoverable: "foofields-hoverable",
			active: "foofields-active",
			first: "foofields-first",
			last: "foofields-last",
			hidden: "foofields-hidden",
			selected: "foofields-selected",
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
							empty: "foofields-empty-menu",
							showing: "foofields-menu-showing",
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
