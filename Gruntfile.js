module.exports = function(grunt) {
	grunt.initConfig({	
		copy: {
			public: {
				expand: true,
				cwd: 'src',
				src: '*.html',
				dest: 'dist'
			}
		},

		clean: {
			build: {
				src: 'dist'
			}
		},

		sass: {
	        options: {
	            sourceMap: true
	        },
	        compilar: {
	            files: {
	                'src/css/style.css': 'src/sass/style.scss'
	            }
	        }
    	},

		uglify: {
		    build: {
		      files: [{
		          expand: true,
		          cwd: 'src/js',
		          src: '**/*.js',
		          dest: 'dist/js'
		      }]
		    }
		 },

		cssmin: {
		  build: {
		    files: [{
		      expand: true,
		      cwd: 'src/css',
		      src: ['*.css', '*.min.css'],
		      dest: 'dist/css',
		      ext: '.css'
		    }]
		  }
		},

		imagemin: {
			build: {
				expand: true,
				flatten: true,
				cwd: 'src/',
				src: '**/*.{png,jpg,gif}',
				dest: 'dist/img'
			}
		},

		jshint: {
			js: {
				src: 'src/js/**/*.js'
			}
		},

		watch: {
		  	sass: {
				options: {
		            event: ['added', 'changed']
		        },

			    files: 'src/sass/**/*.scss',
			    tasks: 'sass'
			},

			js: {
				options: {
	            	event: ['changed']
	        	},

	        	files: 'dev/assets/js/**/*.js',
	        	tasks: 'jshint:js'
			}
		},

		browserSync: {
			buid: {
				bsFiles: {
					watchTask: true,
					src: ['src/**/*']
				}
			},

			options: {
				server: {
					baseDir: 'src'
				}
			}
		}
	});

	grunt.registerTask('server', ['browserSync', 'watch']);
	grunt.registerTask('dist', ['sass', 'clean', 'copy']);
	grunt.registerTask('minifica', ['uglify', 'cssmin', 'imagemin'])

	grunt.registerTask('default', ['dist', 'minifica']);

	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-sass');

	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-browser-sync')
}