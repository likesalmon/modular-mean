'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var watchify = require('watchify');
var browserify = require('browserify');
var mocha = require('gulp-mocha');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var mochaPhantomjs = require('gulp-mocha-phantomjs');

var nodeFilesToWatch = ['app.js', 'api/**/*.js'];
var nodeTestFiles = ['api/**/test/*.js'];

/*
    Api tasks
*/
gulp.task('mocha', function () {
    return gulp.src(nodeTestFiles, {read: false})
        .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('lint-api', function() {
    return gulp.src(['app.js', './api/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});




/*
    Client tasks
*/
gulp.task('browserify', function() {
    var bundleStream = browserify({
        entries: ['./client/main.js'],
        debug: true
    }).bundle().pipe(source('bundle.js'));
    return bundleStream.pipe(gulp.dest('./public'));
});

gulp.task('testify', function() {
    var bundleStream = browserify({
        entries: ['./client/**/test/*.js'],
        debug: true
    }).bundle().pipe(source('test.bundle.js'));
    return bundleStream.pipe(gulp.dest('./public'));
});

gulp.task('views', function () {
    gulp.src('client/index.html')
        .pipe(gulp.dest('public/'));

    gulp.src('client/todo/*.html')
        .pipe(gulp.dest('public/todo/'));
});

gulp.task('sass', function () {
    gulp.src('client/sass/*.scss')
        .pipe(sass({ onError: function (err) {
            console.error(err);
        }}))
        .pipe(autoprefixer('last 2 versions', '> 1%', 'ie 8'))
        .pipe(gulp.dest('public/css/'));
});

gulp.task('lint-client', function() {
    return gulp.src('./client/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});


/*
    Watchers
*/
gulp.task('watch', function () {
    gulp.watch(['app.js', 'api/**/*.js'], ['lint-api']);
    gulp.watch('client/**/*.js', ['lint-client', 'browserify']);
    gulp.watch(['client/**/*.html'], ['views']);
    gulp.watch(['client/sass/*.scss'], ['sass']);
});

gulp.task('test', function () {
    gulp.watch(nodeFilesToWatch, ['mocha']);
});
