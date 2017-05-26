'use strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')();

gulp.task('styles', function() {
    return gulp.src('./src/scss/*/**.scss')
        .pipe($.plumber())
        .pipe($.sass()).on('error', sass.logError)
        .pipe($.autoprefixer())
        .pipe(gulp.dest('./dist/css'));
});
