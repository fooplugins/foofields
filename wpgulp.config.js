/**
 * WPGulp Configuration File
 *
 * 1. Edit the variables as per your project requirements.
 * 2. In paths you can add <<glob or array of globs>>.
 *
 * @package WPGulp
 */

module.exports = {

	watch: {
		scss: "./src/scss/**/*.scss",
		js: "./src/js/**/*.js",
		img: "./src/img/**/*"
	},

	copy: {
		"./src/js/__utils.js": {
			options: {
				match: /FooUtils/g,
				replacement: "FooFields.utils",
			},
			files: ["./node_modules/foo-utils/dist/foo-utils.js"]
		},
		"./assets/vendor/selectize/selectize.css": "./src/vendor/selectize/selectize.css"
	},

	generator: {
		"./dist/generator/assets/vendor/foofields/foofields.min.css": "./assets/vendor/foofields/foofields.min.css",
		"./dist/generator/assets/vendor/foofields/maps/foofields.css.map": "./assets/vendor/foofields/maps/foofields.css.map",
		"./dist/generator/assets/vendor/foofields/foofields.min.js": "./assets/vendor/foofields/foofields.min.js",
		"./dist/generator/assets/vendor/selectize/selectize.min.js": "./assets/vendor/selectize/selectize.min.js",
		"./dist/generator/assets/vendor/selectize/selectize.css": "./assets/vendor/selectize/selectize.css",
		"./dist/generator/includes/admin/foofields/class-base.php.txt": {
			options: { match: /FooPlugins\\FooFields/g, replacement: "{namespace}" },
			files: ["./includes/admin/foofields/class-base.php"]
		},
		"./dist/generator/includes/admin/foofields/class-container.php.txt": {
			options: { match: /FooPlugins\\FooFields/g, replacement: "{namespace}" },
			files: ["./includes/admin/foofields/class-container.php"]
		},
		"./dist/generator/includes/admin/foofields/class-metabox.php.txt": {
			options: { match: /FooPlugins\\FooFields/g, replacement: "{namespace}" },
			files: ["./includes/admin/foofields/class-metabox.php"]
		},
		"./dist/generator/includes/admin/foofields/class-settings-page.php.txt": {
			options: { match: /FooPlugins\\FooFields/g, replacement: "{namespace}" },
			files: ["./includes/admin/foofields/class-settings-page.php"]
		},
		"./dist/generator/includes/admin/foofields/fields/class-ajax-button.php.txt": {
			options: { match: /FooPlugins\\FooFields/g, replacement: "{namespace}" },
			files: ["./includes/admin/foofields/fields/class-ajax-button.php"]
		},
		"./dist/generator/includes/admin/foofields/fields/class-embed-metabox.php.txt": {
			options: { match: /FooPlugins\\FooFields/g, replacement: "{namespace}" },
			files: ["./includes/admin/foofields/fields/class-embed-metabox.php"]
		},
		"./dist/generator/includes/admin/foofields/fields/class-field.php.txt": {
			options: { match: /FooPlugins\\FooFields/g, replacement: "{namespace}" },
			files: ["./includes/admin/foofields/fields/class-field.php"]
		},
		"./dist/generator/includes/admin/foofields/fields/class-header.php.txt": {
			options: { match: /FooPlugins\\FooFields/g, replacement: "{namespace}" },
			files: ["./includes/admin/foofields/fields/class-header.php"]
		},
		"./dist/generator/includes/admin/foofields/fields/class-icon.php.txt": {
			options: { match: /FooPlugins\\FooFields/g, replacement: "{namespace}" },
			files: ["./includes/admin/foofields/fields/class-icon.php"]
		},
		"./dist/generator/includes/admin/foofields/fields/class-input-list.php.txt": {
			options: { match: /FooPlugins\\FooFields/g, replacement: "{namespace}" },
			files: ["./includes/admin/foofields/fields/class-input-list.php"]
		},
		"./dist/generator/includes/admin/foofields/fields/class-repeater.php.txt": {
			options: { match: /FooPlugins\\FooFields/g, replacement: "{namespace}" },
			files: ["./includes/admin/foofields/fields/class-repeater.php"]
		},
		"./dist/generator/includes/admin/foofields/fields/class-repeater-delete.php.txt": {
			options: { match: /FooPlugins\\FooFields/g, replacement: "{namespace}" },
			files: ["./includes/admin/foofields/fields/class-repeater-delete.php"]
		},
		"./dist/generator/includes/admin/foofields/fields/class-repeater-index.php.txt": {
			options: { match: /FooPlugins\\FooFields/g, replacement: "{namespace}" },
			files: ["./includes/admin/foofields/fields/class-repeater-index.php"]
		},
		"./dist/generator/includes/admin/foofields/fields/class-selectize.php.txt": {
			options: { match: /FooPlugins\\FooFields/g, replacement: "{namespace}" },
			files: ["./includes/admin/foofields/fields/class-selectize.php"]
		},
		"./dist/generator/includes/admin/foofields/fields/class-selectize-multi.php.txt": {
			options: { match: /FooPlugins\\FooFields/g, replacement: "{namespace}" },
			files: ["./includes/admin/foofields/fields/class-selectize-multi.php"]
		},
		"./dist/generator/includes/admin/foofields/fields/class-suggest.php.txt": {
			options: { match: /FooPlugins\\FooFields/g, replacement: "{namespace}" },
			files: ["./includes/admin/foofields/fields/class-suggest.php"]
		},
		"./dist/generator/includes/admin/foofields/fields/class-textarea.php.txt": {
			options: { match: /FooPlugins\\FooFields/g, replacement: "{namespace}" },
			files: ["./includes/admin/foofields/fields/class-textarea.php"]
		}
	},

	scss: {
		"./assets/vendor/foofields/foofields.css": "./src/scss/foofields.scss"
	},

	js: {
		"./assets/vendor/selectize/selectize.js": [ "./src/vendor/selectize/selectize.js" ],
		"./assets/vendor/foofields/foofields.js": [
			"./src/vendor/wpColorPickerAlpha.js",
			"./src/js/__config.js",
			"./src/js/__utils.js",
			"./src/js/__static.js",
			"./src/js/Instance.js",
			"./src/js/Component.js",
			"./src/js/Container.js",
			"./src/js/Tab.js",
			"./src/js/TabMenu.js",
			"./src/js/TabMenuItem.js",
			"./src/js/Content.js",
			"./src/js/Fields.js",
			"./src/js/Field.js",
			"./src/js/fields/**/*.js",
			"./src/js/__init.js"
		]
	},

	img: {
		"./assets/vendor/foofields/img/": "./src/img/**/*"
	},

	translate: {
		options: {
			domain: 'foofields',
			package: 'FooFields'
		},
		files: {
			"./languages/foofields.pot": "./**/*.php"
		}
	},

	// Browsers you care about for autoprefixing. Browserlist https://github.com/ai/browserslist
	// The following list is set as per WordPress requirements. Though, Feel free to change.
	BROWSERS_LIST: [
		'last 2 version',
		'> 1%',
		'ie >= 11',
		'last 1 Android versions',
		'last 1 ChromeAndroid versions',
		'last 2 Chrome versions',
		'last 2 Firefox versions',
		'last 2 Safari versions',
		'last 2 iOS versions',
		'last 2 Edge versions',
		'last 2 Opera versions'
	]
};
