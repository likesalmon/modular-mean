'use strict';

var gulp = require('gulp');
// var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
// var source = require('vinyl-source-stream');
// var buffer = require('vinyl-buffer');
var transform = require('vinyl-transform');
var rename = require('gulp-rename');
// var watchify = require('watchify');
var browserify = require('browserify');
var mocha = require('gulp-mocha');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
// var minifyCSS = require('gulp-minify-css');
// var mochaPhantomjs = require('gulp-mocha-phantomjs');

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
    var bundle = transform(function(filename) {
        var b = browserify({
            entries: filename,
            debug: true,
            insertGlobals: true
        });
        return b.bundle();
    });

    return gulp.src(['./client/main.js'])
        .pipe(bundle)
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(rename('bundle.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./public'))
        .pipe(gulp.dest('./client/test'));
    // var bundleStream = browserify({
    //     entries: ['./client/main.js'],
    //     debug: true
    // }).bundle().pipe(source('bundle.js'));
    // return bundleStream.pipe(gulp.dest('./public'));
});

gulp.task('browserify-tests', function() {
    // var bundleStream = browserify({
    //     entries: ['./client/todo/test/todo.ctrl.test.js'],
    //     debug: true
    // }).bundle().pipe(source('test.bundle.js'));
    // return bundleStream.pipe(gulp.dest('./client/test/'));
    var browserified = transform(function(filename) {
        var b = browserify(filename);
        return b.bundle();
    });

    // hello gulp.src() my old friend
    return gulp.src(['./client/**/test/*.js'])
        .pipe(browserified)
        .pipe(rename('test.bundle.js'))
        .pipe(gulp.dest('./client/test'));
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
    return gulp.src(['client/**/*.js', '!client/test/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});


/*
    Watchers
*/
gulp.task('watch', function () {
    gulp.watch(['app.js', 'api/**/*.js'], ['lint-api']);
    gulp.watch(['client/**/*.js', '!client/test/*.js'], ['lint-client', 'browserify']);
    gulp.watch(['client/**/*.html'], ['views']);
    gulp.watch(['client/sass/*.scss'], ['sass']);
});

gulp.task('test', function () {
    gulp.watch(nodeFilesToWatch, ['mocha']);
});
