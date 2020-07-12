"use strict";
module.exports = function ( grunt ) {

	grunt.initConfig({
		"pkg": grunt.file.readJSON("./package.json"),
		"clean": {
			"dist": "./dist/",
			"foo-utils": "./dist/foofields.utils.js",
			"jsdoc": "./docs/jsdocs"
		},
		"foo-utils": {
			"options": {
				"namespace": "FooFields.utils",
				"dest": "./dist/foofields.utils.js"
			}
		},
		"concat": {
			"options": {

			},
			"build": {
				"files": {
					"./dist/js/foofields.js": [
						"./src/js/__config.js",
						"./dist/foofields.utils.js",
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
						// "./src/js/fields/*.js",
						"./src/js/__init.js"
					],
					"./dist/css/foofields.css": [
						"./src/css/Container.css",
						"./src/css/Content.css",
						"./src/css/Field.css",
						"./src/css/tabs/Tabs.css",
						"./src/css/tabs/Tab.css",
						"./src/css/tabs/TabMenu.css",
						"./src/css/tabs/TabMenuItem.css",
						"./src/css/styles/Metabox.css"
					]
				}
			}
		},
		"uglify": {
			"options": {
				"preserveComments": false,
				"banner": '/*\n' +
					'* <%= pkg.title %> - <%= pkg.description %>\n' +
					'* @version <%= pkg.version %>\n' +
					'* @link <%= pkg.homepage %>\n' +
					'* @copyright Steven Usher & Brad Vincent 2015\n' +
					'* @license Released under the GPLv3 license.\n' +
					'*/\n'
			},
			"build": {
				"files": {
					"./dist/js/foofields.min.js": "./dist/js/foofields.js"
				}
			}
		},
		"cssmin": {
			"options": {
				"specialComments": false,
				"banner": '/*\n' +
					'* <%= pkg.title %> - <%= pkg.description %>\n' +
					'* @version <%= pkg.version %>\n' +
					'* @link <%= pkg.homepage %>\n' +
					'* @copyright Steven Usher & Brad Vincent 2015\n' +
					'* @license Released under the GPLv3 license.\n' +
					'*/\n'
			},
			"build": {
				"files": {
					"./dist/css/foofields.min.css": "./dist/css/foofields.css"
				}
			}
		},
		"copy": {
			"build": {
				"expand": true,
				"src": ["./src/css/img/*.png","./src/css/img/*.svg"],
				"dest": "./dist/img",
				"flatten": true
			},
			"assets": {
				"expand": true,
				"src": ["./dist/css/*.css","./dist/js/*.js"],
				"dest": "./assets/vendor/foofields",
				"flatten": true
			}
		},
		"jsdoc": {
			"all": {
				"src": [
					"./readme.md","./dist/js/foofields.js"
				],
				"jsdoc": "./node_modules/jsdoc/jsdoc.js",
				"options": {
					"destination": "./docs/jsdocs",
					"recurse": true,
					"configure": "./jsdoc.json",
					"template": "./node_modules/foodoc/template",
					"tutorials": "./src/tutorials/"
				}
			}
		}
	});

	// load required tasks
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-cssmin");
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks("foo-utils");
	grunt.loadNpmTasks("grunt-jsdoc");

	// register build task for this project
	grunt.registerTask("build", [
		"clean:dist",
		"foo-utils", // create the foofields.utils.js file that is then included as part of the core
		"concat:build",
		"uglify:build",
		"cssmin:build",
		"copy:build",
		"copy:assets",
		"clean:foo-utils" // remove the foofields.utils.js file as it is now part of foofields.core.js
	]);

	grunt.registerTask("docs", [
		"build",
		"clean:jsdoc",
		"jsdoc:all"
	]);

	// register build task for this project
	grunt.registerTask("build-foo", [
		"clean:dist",
		"foo-utils"
	]);

};
