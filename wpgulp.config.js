/**
 * WPGulp Configuration File
 *
 * 1. Edit the variables as per your project requirements.
 * 2. In paths you can add <<glob or array of globs>>.
 *
 * @package WPGulp
 */

module.exports = {

	// Project options.
	projectURL: 'http://127.0.0.1/', // Local project URL of your already running WordPress site. Could be something like wpgulp.local or localhost:3000 depending upon your local WordPress setup.
	productURL: './', // Theme/Plugin URL. Leave it like it is, since our gulpfile.js lives in the root folder.
	browserAutoOpen: false,
	injectChanges: true,

	// Style options.
	styleSRC: './src/scss/*.scss', // Path to main .scss file.
	styleDestination: './assets/css', // Path to place the compiled CSS file. Default set to root folder.
	scriptDestination: './assets/js/',
	outputStyle: 'compact', // Available options → 'compact' or 'compressed' or 'nested' or 'expanded'
	errLogToConsole: true,
	precision: 10,

	styles: [
		{
			styleSRC: './src/scss/foofields.scss',
			styleDestination: './assets/vendor/foofields/' //not being used at the moment
		}
	],
	scripts: [
		{
			scriptSRC: './src/js/*.js',
			scriptFile: 'foofields',
			scriptDestination: './assets/vendor/foofields/' //not being used at the moment
		}
	],

	js: {
		options: {
			// ... any options
		},
		files: {
			"./assets/vendor/foofields/foofields.js": [
				"./src/js/__config.js",
				"./src/js/foofields.utils.js",
				"./src/js/__static.js",
				"./src/js/Instance.js",
				"./src/js/Component.js",
				"./src/js/Container.js",
				"./src/js/Content.js",
				"./src/js/Fields.js",
				"./src/js/Field.js",
				"./src/js/Tab.js",
				"./src/js/TabMenu.js",
				"./src/js/TabMenuItem.js",
				"./src/js/__init.js"
			]
		}
	},

	// Images options.
	imgSRC: './assets/img/raw/**/*', // Source folder of images which should be optimized and watched. You can also specify types e.g. raw/**.{png,jpg,gif} in the glob.
	imgDST: './assets/img/', // Destination folder of optimized images. Must be different from the imagesSRC folder.

	// Watch files paths.
	watchStyles: './src/scss/**/*.scss', // Path to all *.scss files inside css folder and inside them.
	watchScripts: './src/js/**/*.js', // Path to all *.js files inside scripts folder and inside them.
	watchPhp: './**/*.php', // Path to all PHP files.

	// Translation options.
	textDomain: 'foofields', // Your textdomain here.
	translationFile: 'foofields.pot', // Name of the translation file.
	translationDestination: './languages', // Where to save the translation files.
	packageName: 'FooFields', // Package name.
	bugReport: 'https://fooplugins.com', // Where can users report bugs.
	lastTranslator: 'Brad Vincent <brad@fooplugins.com>', // Last translator Email ID.
	team: 'Brad Vincent <brad@fooplugins.com', // Team's Email ID.

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
