/**
 * Gulpfile.
 *
 * Gulp with WordPress.
 *
 * Implements:
 *      1. Live reloads browser with BrowserSync.
 *      2. CSS: Sass to CSS conversion, error catching, Autoprefixing, Sourcemaps,
 *         CSS minification, and Merge Media Queries.
 *      3. JS: Concatenates & uglifies Vendor and Custom JS files.
 *      4. Images: Minifies PNG, JPEG, GIF and SVG images.
 *      5. Watches files for changes in CSS or JS.
 *      6. Watches files for changes in PHP.
 *      7. Corrects the line endings.
 *      8. InjectCSS instead of browser page reload.
 *      9. Generates .pot file for i18n and l10n.
 *
 * @tutorial https://github.com/ahmadawais/WPGulp
 * @author Ahmad Awais <https://twitter.com/MrAhmadAwais/>
 */

/**
 * Load WPGulp Configuration.
 *
 * TODO: Customize your project in the wpgulp.js file.
 */
const config = require( './wpgulp.config.js' );

/**
 * Load Plugins.
 *
 * Load gulp plugins and passing them semantic names.
 */
const gulp = require( 'gulp' ); // Gulp of-course.

// CSS related plugins.
const sass = require( 'gulp-sass' ); // Gulp plugin for Sass compilation.
const minifycss = require( 'gulp-uglifycss' ); // Minifies CSS files.
const autoprefixer = require( 'gulp-autoprefixer' ); // Autoprefixing magic.
const mmq = require( 'gulp-merge-media-queries' ); // Combine matching media queries into one.

// JS related plugins.
const replace = require( 'gulp-string-replace' );
const concat = require( 'gulp-concat' ); // Concatenates JS files.
const uglify = require( 'gulp-uglify' ); // Minifies JS files.
const babel = require( 'gulp-babel' ); // Compiles ESNext to browser compatible JS.

// Image related plugins.
const imagemin = require( 'gulp-imagemin' ); // Minify PNG, JPEG, GIF and SVG images with imagemin.

// Utility related plugins.
const rename = require( 'gulp-rename' ); // Renames files E.g. style.css -> style.min.css.
const lineec = require( 'gulp-line-ending-corrector' ); // Consistent Line Endings for non UNIX systems. Gulp Plugin for Line Ending Corrector (A utility that makes sure your files have consistent line endings).
const filter = require( 'gulp-filter' ); // Enables you to work on a subset of the original files by filtering them using a glob.
const sourcemaps = require( 'gulp-sourcemaps' ); // Maps code in a compressed file (E.g. style.css) back to it’s original position in a source file (E.g. structure.scss, which was later combined with other css files to generate style.css).
const notify = require( 'gulp-notify' ); // Sends message notification to you.
const browser = require( 'browser-sync' ).create(); // Reloads browser and injects CSS. Time-saving synchronized browser testing.
const wpPot = require( 'gulp-wp-pot' ); // For generating the .pot file.
const sort = require( 'gulp-sort' ); // Recommended to prevent unnecessary changes in pot-file.
const cache = require( 'gulp-cache' ); // Cache files in stream for later use.
const remember = require( 'gulp-remember' ); //  Adds all the files it has ever seen back into the stream.
const plumber = require( 'gulp-plumber' ); // Prevent pipe breaking caused by errors from gulp plugins.
const beep = require( 'beepbeep' );
const merge = require( 'merge-stream' );
const { defaults, isObjectLike } = require( 'lodash' );

const path = require( 'path' );

/**
 * Custom Error Handler.
 *
 * @param {Error} err
 */
const errorHandler = err => {
	notify.onError( '\n\n❌  ===> ERROR: <%= error.message %>\n' )( err );
	beep();

	// this.emit('end');
};

const filesObj = (obj, defaultOptions) => {
	let opt = defaults(defaultOptions, {
		allowEmpty: true,
		process: function(src, file, options, files) {
			return src;
		}
	});
	if (isObjectLike(obj)){
		return {
			options: defaults(isObjectLike(obj.options) ? obj.options : {}, opt),
			files: isObjectLike(obj.files) ? obj.files : obj
		};
	}
	return { options: opt, files: obj };
};

const filesTask = (taskName, defaultOptions, done) => {
	if (!isObjectLike(config[taskName])) return done();

	let root = filesObj(config[taskName], defaultOptions),
		names = Object.keys(root.files);

	if ( names.length === 0 ) return done();

	let tasks = names.map(function(name){
		let task = filesObj(root.files[name], root.options);
		let src = gulp.src(task.files, {allowEmpty: task.options.allowEmpty}).pipe( plumber( errorHandler ) ),
			file = {
				path: name,
				dir: path.dirname(name),
				name: path.basename(name)
			};
		return task.options.process( src, file, task.options, task.files );
	});

	return merge( tasks );
};

/**
 * Task: `watch`
 *
 * Watches for file changes and executes the associated task.
 *
 * @param {function} done Done.
 */
gulp.task( "watch", (done) =>{
	let names = Object.keys(config.watch);
	names.forEach((name) => {
		gulp.watch( config.watch[name], gulp.parallel( name ) );
	});
	done();
} );

/**
 * Task: `browser`.
 *
 * Live Reloads, CSS injections, Localhost tunneling.
 * @link http://www.browsersync.io/docs/options/
 *
 * @param {function} done Done.
 */
gulp.task( "browser", (done) => {
	if ( !config.browser ) return done();

	let opt = defaults(config.browser, {
		proxy: 'http://127.0.0.1/',
		open: false,
		injectChanges: true,
		watch: null
	});

	if (opt.watch !== null){
		gulp.watch( opt.watch, (d) => {
			browser.reload();
			d();
		});
	}

	browser.init({
		proxy: opt.proxy,
		open: opt.open,
		injectChanges: opt.injectChanges,
		watchEvents: [ 'change', 'add', 'unlink', 'addDir', 'unlinkDir' ]
	}, done);
});

gulp.task( "scss", (done) => {
	return filesTask("scss", {
		allowEmpty: true,
		outputStyle: "compact",
		precision: 10,
		process: (src, file, opt) => {
			return src.pipe( sourcemaps.init() )
				.pipe( sass({
					outputStyle: opt.outputStyle,
					precision: opt.precision
				}) ).on( 'error', sass.logError )
				.pipe( sourcemaps.write({ includeContent: false }) )
				.pipe( sourcemaps.init({ loadMaps: true }) )
				.pipe( autoprefixer( config.BROWSERS_LIST ) )
				.pipe( sourcemaps.write( './maps' ) )
				.pipe( lineec() ) // Consistent Line Endings for non UNIX systems.
				.pipe( gulp.dest( file.dir ) )
				.pipe( filter( '**/*.css' ) ) // Filtering stream to only css files.
				// .pipe( browser.stream() ) // Reloads .css if that is enqueued.
				.pipe( mmq({ log: true }) ) // Merge Media Queries only for .min.css version.
				.pipe( rename({ suffix: ".min" }) )
				.pipe( minifycss({ maxLineLen: 10 }) )
				.pipe( lineec() ) // Consistent Line Endings for non UNIX systems.
				.pipe( gulp.dest( file.dir ) )
				.pipe( filter( '**/*.css' ) ) // Filtering stream to only css files.
				// .pipe( browser.stream() ) // Reloads .min.css if that is enqueued.
				.pipe( notify({ message: '\n\n✅  ===> SCSS — completed!\n', onLast: true }) );
		}
	}, done);
});

/**
 * Task: `js`.
 *
 * Minifies PNG, JPEG, GIF and SVG images.
 *
 * This task does the following:
 *     1. Gets all PNG, JPEG, GIF and SVG images from the src directories.
 *     2. Minifies the images.
 *     3. Generates and saves the optimized images to there output directories.
 *
 * This task will run only once, if you want to run it
 * again, do it with the command `gulp img`.
 *
 * Read the following to change the `src` options.
 * @link https://gulpjs.com/docs/en/api/src
 *
 * Read the following to change the `imagemin` options.
 * @link https://github.com/sindresorhus/gulp-imagemin
 */
gulp.task( "js", (done) => {
	return filesTask("js", {
		allowEmpty: true,
		process: (src, file, opt) => {
			let basename = path.basename(file.path, ".js");
			return src.pipe(
				babel({
					presets: [
						[
							'@babel/preset-env', // Preset to compile your modern JS to ES5.
							{
								targets: {browsers: config.BROWSERS_LIST} // Target browser list to support.
							}
						]
					]
				})
			)
				.pipe(remember(basename)) // Bring all files back to stream.
				.pipe(concat(file.name))
				.pipe(lineec()) // Consistent Line Endings for non UNIX systems.
				.pipe(gulp.dest(file.dir))
				.pipe(
					rename({
						basename: basename,
						suffix: ".min"
					})
				)
				.pipe(uglify())
				.pipe(lineec()) // Consistent Line Endings for non UNIX systems.
				.pipe(gulp.dest(file.dir))
				.pipe(notify({message: '\n\n✅  ===> JS — completed!\n', onLast: true}));
		}
	}, done);
});

/**
 * Task: `img`.
 *
 * Minifies PNG, JPEG, GIF and SVG images.
 *
 * This task does the following:
 *     1. Gets all PNG, JPEG, GIF and SVG images from the src directories.
 *     2. Minifies the images.
 *     3. Generates and saves the optimized images to there output directories.
 *
 * This task will run only once, if you want to run it
 * again, do it with the command `gulp img`.
 *
 * Read the following to change the `src` options.
 * @link https://gulpjs.com/docs/en/api/src
 *
 * Read the following to change the `imagemin` options.
 * @link https://github.com/sindresorhus/gulp-imagemin
 */
gulp.task( "img", (done) => {
	return filesTask("img", {
		allowEmpty: true,
		process: (src, file, opt) => {
			return src.pipe(
				cache(
					imagemin([
						imagemin.gifsicle({ interlaced: true }),
						imagemin.jpegtran({ progressive: true }),
						imagemin.optipng({ optimizationLevel: 3 }), // 0-7 low-high.
						imagemin.svgo({
							plugins: [ { removeViewBox: true }, { cleanupIDs: false } ]
						})
					])
				)
			)
				.pipe( gulp.dest( file.path ) )
				.pipe( notify({ message: '\n\n✅  ===> IMG — completed!\n', onLast: true }) );
		}
	}, done);
});

/**
 * Task: `img-clear-cache`.
 *
 * Deletes the images cache. By running the next "img" task,
 * each image will be regenerated.
 */
gulp.task( 'img-clear-cache', function( done ) {
	return cache.clearAll( done );
});

/**
 * WP POT Translation File Generator.
 *
 * This task does the following:
 * 1. Gets the source of all the PHP files
 * 2. Sort files in stream by path or any custom sort comparator
 * 3. Applies wpPot with the variable set at the top of this file
 * 4. Generate a .pot file of i18n that can be used for l10n to build .mo file
 */
gulp.task( "translate", (done) => {
	return filesTask("translate", {
		allowEmpty: true,
		domain: null,
		package: null,
		bugReport: 'https://fooplugins.com',
		lastTranslator: "Brad Vincent <brad@fooplugins.com>",
		team: "FooPlugins <info@fooplugins.com>",
		process: (src, file, opt) => {
			return src.pipe( sort() )
				.pipe(
					wpPot({
						domain: opt.domain,
						package: opt.package,
						bugReport: opt.bugReport,
						lastTranslator: opt.lastTranslator,
						team: opt.team
					})
				)
				.pipe( gulp.dest( file.path ) )
				.pipe( notify({ message: '\n\n✅  ===> TRANSLATE — completed!\n', onLast: true }) );
		}
	}, done);
});

const zip = require( 'gulp-zip' ),
	buildInclude = [ '**/*', '!package*.json', '!./{node_modules,node_modules/**/*}', '!./{dist,dist/**/*}', '!./{assets/css,assets/scss/**/*}', '!./{assets/js,assets/js/**/*}' ],
	packageJSON = require( './package.json' ),
	fileName = packageJSON.name,
	fileVersion = packageJSON.version;

/**
 * Used to generate the plugin zip file that will be uploaded the Freemius.
 * Generates a zip file based on the name and version found within the package.json
 *
 * usage : gulp zip
 *
 */
gulp.task(
	'zip', function() {
		return gulp.src( buildInclude, {base: './'})
			.pipe( zip( fileName + '.v' + fileVersion + '.zip' ) )
			.pipe( gulp.dest( 'dist/' ) )
			.pipe( notify({message: 'Zip task complete', onLast: true}) );
	}
);

const shell = require( 'gulp-shell' );

//runs composer install for deployment
gulp.task( 'composer-install-deploy', shell.task([
	'composer install --prefer-dist --optimize-autoloader --no-dev'
]) );

/**
 * Get the plugin ready for deployment
 *
 * This runs the following tasks in sequence :
 *   composer-install-deploy
 *   translate
 *   zip
 *
 * usage : gulp pre-deploy
 *
 */
gulp.task( 'pre-deploy', gulp.series( 'composer-install-deploy', 'translate', 'zip' ) );

/**
 * Deploy the plugin
 *
 * This runs the following tasks in sequence :
 *
 *   styles
 *   scripts
 *   copy-vendor-scripts
 *   images
 *   pre-deploy
 *   freemius-deploy
 *
 * usage : gulp deploy
 *
 */
//gulp.task( 'deploy', gulp.series( 'styles', 'scripts', 'images', 'pre-deploy', 'freemius-deploy' ) );

gulp.task("copy", function (done) {
	return filesTask("copy", {
		allowEmpty: true,
		match: null,
		replacement: null,
		logging: false,
		process: (src, file, opt) => {
			if (opt.match !== null && opt.replacement !== null){
				return src.pipe( replace(opt.match, opt.replacement, { logs: { enabled: opt.logging } }) )
					.pipe( rename(file.name) )
					.pipe( gulp.dest(file.dir) )
					.pipe( notify({ message: '\n\n✅  ===> COPY — completed!\n', onLast: true }) );
			}
			return src.pipe( rename(file.name) )
				.pipe( gulp.dest(file.dir) )
				.pipe( notify({ message: '\n\n✅  ===> COPY — completed!\n', onLast: true }) );
		}
	}, done);
});

gulp.task("default", gulp.series( "copy", gulp.parallel( "scss", "js", "img", "watch" )));

gulp.task("start", gulp.parallel( "default", "browser" ));

gulp.task("generator", function (done) {
	return filesTask("generator", {
		allowEmpty: true,
		match: null,
		replacement: null,
		logging: false,
		process: (src, file, opt) => {
			if (opt.match !== null && opt.replacement !== null){
				return src.pipe( replace(opt.match, opt.replacement, { logs: { enabled: opt.logging } }) )
					.pipe( rename(file.name) )
					.pipe( gulp.dest(file.dir) )
					.pipe( notify({ message: '\n\n✅  ===> Generator Deployment — completed!\n', onLast: true }) );
			}
			return src.pipe( rename(file.name) )
				.pipe( gulp.dest(file.dir) )
				.pipe( notify({ message: '\n\n✅  ===> Generator Deployment — completed!\n', onLast: true }) );
		}
	}, done);
});
