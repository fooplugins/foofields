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

	browser: {
		proxy: 'http://127.0.0.1/',
		open: false,
		injectChanges: true,
		watch: "./assets/**/*"
	},

	copy: {
		"./src/js/__utils.js": {
			options: {
				match: /FooUtils/g,
				replacement: "FooFields.utils",
			},
			files: ["./node_modules/foo-utils/dist/foo-utils.js"]
		},
		"./assets/vendor/selectize/selectize.js": "./node_modules/selectize/dist/js/standalone/selectize.js",
		"./assets/vendor/selectize/selectize.min.js": "./node_modules/selectize/dist/js/standalone/selectize.min.js",
		"./assets/vendor/selectize/selectize.css": "./node_modules/selectize/dist/css/selectize.css"
	},

	scss: {
		"./assets/vendor/foofields/foofields.css": "./src/scss/foofields.scss"
	},

	js: {
		"./assets/vendor/foofields/foofields.js": [
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
			"./src/js/fields/*.js",
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
