/**
 * Gulpfile.
 *
 * Gulp with WordPress.
 *
 * Implements:
 *      1. CSS: Sass to CSS conversion, error catching, Autoprefixing, Sourcemaps,
 *         CSS minification, and Merge Media Queries.
 *      2. JS: Concatenates & uglifies Vendor and Custom JS files.
 *      3. Images: Minifies PNG, JPEG, GIF and SVG images.
 *      4. Watches files for changes in CSS or JS.
 *      5. Watches files for changes in PHP.
 *      6. Corrects the line endings.
 *      7. Generates .pot file for i18n and l10n.
 *
 * @author Steve Usher
 */

const config = require( './wpgulp.config.js' );

const gulp = require( 'gulp' ); // Gulp of-course.

// CSS related plugins.
const sass = require( 'gulp-sass' )( require( 'node-sass' ) ); // Gulp plugin for Sass compilation.
const minifycss = require( 'gulp-uglifycss' ); // Minifies CSS files.
const autoprefixer = require( 'gulp-autoprefixer' ); // Autoprefixing magic.
const mmq = require( 'gulp-merge-media-queries' ); // Combine matching media queries into one.

// JS related plugins.
const replace = require( 'gulp-string-replace' );
const concat = require( 'gulp-concat' ); // Concatenates JS files.
const uglify = require( 'gulp-uglify' ); // Minifies JS files.
const babel = require( 'gulp-babel' ); // Compiles ESNext to browser compatible JS.

// Utility related plugins.
const shell = require( 'gulp-shell' ); // used to perform composer install
const rename = require( 'gulp-rename' ); // Renames files E.g. style.css -> style.min.css.
const lec = require( 'gulp-line-ending-corrector' ); // Consistent Line Endings for non UNIX systems. Gulp Plugin for Line Ending Corrector (A utility that makes sure your files have consistent line endings).
const filter = require( 'gulp-filter' ); // Enables you to work on a subset of the original files by filtering them using a glob.
const sourcemaps = require( 'gulp-sourcemaps' ); // Maps code in a compressed file (E.g. style.css) back to its original position in a source file (E.g. structure.scss, which was later combined with other css files to generate style.css).
const wpPot = require( 'gulp-wp-pot' ); // For generating the .pot file.
const sort = require( 'gulp-sort' ); // Recommended to prevent unnecessary changes in pot-file.
const order = require( 'gulp-order' );
const cache = require( 'gulp-cache' ); // Cache files in stream for later use.
const plumber = require( 'gulp-plumber' ); // Prevent pipe breaking caused by errors from gulp plugins.
const merge = require( 'merge-stream' );
const { defaults, isObjectLike } = require( 'lodash' );
const path = require( 'path' );
const { lstatSync, existsSync } = require( 'fs' );

/**
 * Custom Error Handler.
 *
 * @param {Error} err
 */
const errorHandler = err => console.error( err );

const filesObj = ( obj, defaultOptions ) => {
	let opt = defaults( defaultOptions, {
		allowEmpty: true,
		process: function( src ) {
			return src;
		}
	} );
	if ( isObjectLike( obj ) ) {
		return {
			options: defaults( isObjectLike( obj.options ) ? obj.options : {}, opt ),
			files: isObjectLike( obj.files ) ? obj.files : obj
		};
	}
	return { options: opt, files: obj };
};

const filesTask = ( taskName, defaultOptions, done ) => {
	if ( !isObjectLike( config[ taskName ] ) ) {
		return done();
	}

	let root = filesObj( config[ taskName ], defaultOptions ),
		names = Object.keys( root.files );

	if ( 0 === names.length ) {
		return done();
	}

	let tasks = names.map( function( name ) {
		let task = filesObj( root.files[ name ], root.options );
		let src = gulp.src( task.files, { allowEmpty: task.options.allowEmpty } ).pipe( plumber( errorHandler ) ),
			file = {
				path: name, dir: path.dirname( name ), name: path.basename( name )
			};
		return task.options.process( src, file, task.options, task.files );
	} );

	return merge( tasks );
};

/**
 * Task: `watch`
 *
 * Watches for file changes and executes the associated task.
 *
 * @param {function} done Done.
 */
gulp.task( 'watch', ( done ) => {
	let names = Object.keys( config.watch );
	names.forEach( ( name ) => {
		gulp.watch( config.watch[ name ], gulp.parallel( name ) );
	} );
	done();
} );

/**
 * Task: `copy`
 */
gulp.task( 'copy', function( done ) {
	return filesTask( 'copy', {
		allowEmpty: true, match: null, replacement: null, logging: false, process: ( src, file, opt ) => {
			if ( null !== opt.match && null !== opt.replacement ) {
				return src.pipe( replace( opt.match, opt.replacement, { logs: { enabled: opt.logging } } ) )
					.pipe( rename( file.name ) )
					.pipe( gulp.dest( file.dir ) );
			}
			return src.pipe( rename( file.name ) )
				.pipe( gulp.dest( file.dir ) );
		}
	}, done );
} );

/**
 * Task: `scss`
 */
gulp.task( 'scss', ( done ) => {
	return filesTask( 'scss', {
		allowEmpty: true, sass: {
			outputStyle: 'compact', precision: 10
		}, process: ( src, file, opt ) => {
			let basename = path.basename( file.path, '.css' );
			return src
				.pipe( rename( { basename: basename } ) )
				.pipe( sourcemaps.init() )
				.pipe( sass( opt.sass ) ).on( 'error', sass.logError )
				.pipe( sourcemaps.write( { includeContent: false } ) )
				.pipe( sourcemaps.init( { loadMaps: true } ) )
				.pipe( autoprefixer( config.BROWSERS_LIST ) )
				.pipe( sourcemaps.write( './maps' ) )
				.pipe( lec() ) // Consistent Line Endings for non UNIX systems.
				.pipe( gulp.dest( file.dir ) )
				.pipe( filter( '**/*.css' ) ) // Filtering stream to only css files.
				.pipe( mmq( { log: true } ) ) // Merge Media Queries only for .min.css version.
				.pipe( rename( { basename: basename, suffix: '.min' } ) )
				.pipe( minifycss( { maxLineLen: 10 } ) )
				.pipe( lec() ) // Consistent Line Endings for non UNIX systems.
				.pipe( gulp.dest( file.dir ) );
		}
	}, done );
} );

/**
 * Task: `js`
 */
gulp.task( 'js', ( done ) => {
	return filesTask( 'js', {
		allowEmpty: true, babel: {
			presets: [ [ '@babel/preset-env', // Preset to compile your modern JS to ES5.
				{
					targets: { browsers: config.BROWSERS_LIST } // Target browser list to support.
				} ] ], ignore: [ './src/polyfills' ]
		}, order: {
			base: './'
		}, process: ( src, file, opt, files ) => {
			let basename = path.basename( file.path, '.js' ), baseRegex = new RegExp( '^' + opt.order.base ),
				ordered = files.map( function( file ) {
					return file.replace( baseRegex, '' );
				} );
			return src
				.pipe( babel( opt.babel ) )
				.pipe( order( ordered, opt.order ) )
				.pipe( concat( file.name ) )
				.pipe( lec() ) // Consistent Line Endings for non UNIX systems.
				.pipe( gulp.dest( file.dir ) )
				.pipe( rename( { basename: basename, suffix: '.min' } ) )
				.pipe( uglify() )
				.pipe( lec() ) // Consistent Line Endings for non UNIX systems.
				.pipe( gulp.dest( file.dir ) );
		}
	}, done );
} );

/**
 * Task: `img`.
 */
gulp.task( 'img', ( done ) => {
	if ( !config.hasOwnProperty('img') ) return done();
	const destinations = Object.keys( config['img'] );
	const tasks = destinations.map((dest) => {
		const src = config['img'][dest];
		return gulp.src( src ).pipe( gulp.dest( dest ) );
	});
	return merge( tasks );
} );

/**
 * Task: `img-clear-cache`.
 *
 * Deletes the images cache. By running the next "img" task,
 * each image will be regenerated.
 */
gulp.task( 'img-clear-cache', function( done ) {
	return cache.clearAll( done );
} );

/**
 * WP POT Translation File Generator.
 *
 * This task does the following:
 * 1. Gets the source of all the PHP files
 * 2. Sort files in stream by path or any custom sort comparator
 * 3. Applies wpPot with the variable set at the top of this file
 * 4. Generate a .pot file of i18n that can be used for l10n to build .mo file
 */
gulp.task( 'translate', ( done ) => {
	return filesTask( 'translate', {
		allowEmpty: true,
		domain: null,
		package: null,
		bugReport: 'https://fooplugins.com',
		lastTranslator: 'Brad Vincent <brad@fooplugins.com>',
		team: 'FooPlugins <info@fooplugins.com>',
		process: ( src, file, opt ) => {
			return src.pipe( sort() )
				.pipe( wpPot( {
					domain: opt.domain,
					package: opt.package,
					bugReport: opt.bugReport,
					lastTranslator: opt.lastTranslator,
					team: opt.team
				} ) )
				.pipe( gulp.dest( file.path ) );
		}
	}, done );
} );

const zip = require( 'gulp-zip' ),
	buildInclude = [ '**/*', '!package*.json', '!./{node_modules,node_modules/**/*}', '!./{dist,dist/**/*}', '!./{src,src/**/*}', '!fs-config.json', '!composer.json', '!composer.lock', '!wpgulp.config.js', '!gulpfile.babel.js' ],
	packageJSON = require( './package.json' ), fileName = packageJSON.name, fileVersion = packageJSON.version;
const fs = require( "fs" );

/**
 * Used to generate the plugin zip file that will be uploaded the Freemius.
 * Generates a zip file based on the name and version found within the package.json
 *
 * usage : gulp zip
 *
 */
gulp.task( 'zip', function() {
	return gulp.src( buildInclude, { base: './' } )
		.pipe( zip( fileName + '.v' + fileVersion + '.zip' ) )
		.pipe( gulp.dest( 'dist/' ) );
} );

//runs composer install for deployment
gulp.task( 'composer-install-deploy', shell.task( [ 'composer install --prefer-dist --optimize-autoloader --no-dev' ] ) );

gulp.task( 'default', gulp.series( 'copy', gulp.parallel( 'scss', 'js', 'img' ) ) );
gulp.task( 'develop', gulp.series( 'default', 'watch' ) );
gulp.task( 'pre-deploy', gulp.series( 'default', 'composer-install-deploy', 'translate', 'zip' ) );

gulp.task( 'generator', function( done ) {
	return filesTask( 'generator', {
		allowEmpty: true, match: null, replacement: null, logging: false, process: ( src, file, opt ) => {
			if ( null !== opt.match && null !== opt.replacement ) {
				return src.pipe( replace( opt.match, opt.replacement, { logs: { enabled: opt.logging } } ) )
					.pipe( rename( file.name ) )
					.pipe( gulp.dest( file.dir ) );
			}
			return src.pipe( rename( file.name ) )
				.pipe( gulp.dest( file.dir ) );
		}
	}, done );
} );
