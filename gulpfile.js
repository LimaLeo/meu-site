'use strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')();


gulp.task('default', ['copy'], function() {
	gulp.start('build-img', 'usemin');
});

gulp.task('copy', ['clean'], function() {
	return gulp.src('src/**/*')
		.pipe(gulp.dest('dist'));
});

gulp.task('clean', function() {
	return gulp.src('dist')
		.pipe($.clean());
});

gulp.task('build-img', function() {

  return gulp.src('dist/img/**/*')
    .pipe($.imagemin())
    .pipe(gulp.dest('dist/img'));
});

gulp.task('usemin', function() {
  return gulp.src('dist/**/*.html')
    .pipe($.usemin({
      js: [$.uglify],
      css: [$.autoprefixer, $.cssmin]
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('server', function() {
    $.browserSync.init({
        server: {
            baseDir: 'src'
        }
    });

    gulp.watch('src/**/*').on('change', $.browserSync.reload);

    gulp.watch('src/js/**/*.js').on('change', function(event) {
        console.log("Linting " + event.path);
        gulp.src(event.path)
            .pipe(jshint())
            .pipe($.jshint.reporter($.jshintStylish));
    });

    gulp.watch('src/css/**/*.css').on('change', function(event) {
        console.log("Linting " + event.path);
        gulp.src(event.path)
            .pipe($.csslint())
            .pipe($.csslint.reporter());
    }); 

    gulp.watch('src/scss/**/*.scss').on('change', function(event) {
       var stream = gulp.src(event.path)
            .pipe($.sass-lint())
            .pipe($.sass().on('error', function(erro) {
              console.log('SCSS, erro compilação: ' + erro.filename);
              console.log(erro.message);
            }))
            .pipe(gulp.dest('src/css'));
    });   
});