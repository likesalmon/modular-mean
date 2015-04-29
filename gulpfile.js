'use strict';

var del = require('del');
var gulp = require('gulp');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var browserify = require('browserify');
var through2 = require('through2');
var mocha = require('gulp-mocha');
var compass = require('gulp-compass');
var minifyCss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var karma = require('karma');
var protractor = require('gulp-protractor').protractor;
var webdriver = require('gulp-protractor').webdriver;
var webdriverUpdate = require('gulp-protractor').webdriver_update;

var paths = {
    api: {
        tests: ['api/**/test/*.js'],
        all: ['app.js', 'api/**/*.js']
    }
};

/*
    Api tasks
*/
gulp.task('mocha', function () {
    return gulp.src(paths.api.tests, {read: false})
        .pipe(mocha({reporter: 'spec'}))
        .on('end', function () {
            gutil.log('\n\n***** Mocha Tests Complete *****\n\n\n\n');
        });
});

gulp.task('lint-api', function() {
    return gulp.src(['app.js', './api/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('api-tests', function () {
    gulp.watch(paths.api.all, ['mocha']);
});


/*
    Client tasks
*/
gulp.task('browserify', function () {
    gulp.src(['./client/main.js'])
        .pipe(through2.obj(function (file, enc, next) {
            browserify(file.path)
                .bundle(function (err, res) {
                    file.contents = res;
                    next(null, file);
                });
        }))
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(rename('bundle.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./public'));
});

gulp.task('views', function () {
    gulp.src('client/index.html')
        .pipe(gulp.dest('public/'));

    gulp.src('client/ToDo/*.html')
        .pipe(gulp.dest('public/ToDo/'));
});

gulp.task('compass', function () {
    gulp.src('client/sass/*.scss')
        .pipe(compass({
            http_path: '/',
            project: __dirname + '/client',
            css: '../public/css',
            sass: 'sass',
            image: 'images',
            font: 'css'
        }))
        .pipe(autoprefixer({
            browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1'],
            cascade: false
        }))
        .pipe(sourcemaps.init())
        .pipe(minifyCss())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/css'));
});

gulp.task('images', function () {
    gulp.src('client/images/**/*')
        .pipe(gulp.dest('public/images/'));
});

gulp.task('lint-client', function () {
    gulp.src(['client/**/*.js', '!client/test/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});


gulp.task('webdriver-update', webdriverUpdate);
gulp.task('webdriver', webdriver);

gulp.task('protractor', ['webdriver-update', 'webdriver'], function () {
    return gulp.src('client/**/test/*.e2e.js')
        .pipe(protractor({
            configFile: './protractor.conf.js',
            args: ['--baseUrl', 'http://127.0.0.1:3000']
        }))
        .on('error', function(err) {
            console.error(err);
        })
        .on('end', function () {
            gutil.log('\n\n***** Protractor Tests Complete *****\n\n\n\n');
        });
});

gulp.task('karma', function () {
    karma.server.start({
        configFile: __dirname + '/karma.conf.js'
    });
});


/*
    Build
*/

gulp.task('clean', function (cb) {
    del(['public/**/*'], cb);
});

gulp.task('build', ['clean', 'browserify', 'views', 'compass'], function () {
    gutil.log('*** Run with: $ npm start ***');
});


/*
    Watchers
*/
gulp.task('unit-tests', function () {
    gulp.watch(paths.api.tests, ['mocha']);
});

gulp.task('dev', function () {
    // gulp.watch(['app.js', 'api/**/*.js'], ['lint-api']);
    gulp.watch(paths.api.all, ['mocha']);
    gulp.watch(['client/**/*.js', '!client/test/*.js'], ['browserify', 'protractor']);
    gulp.watch(['client/**/*.html'], ['views']);
    gulp.watch(['client/sass/*.scss'], ['compass']);

    karma.server.start({
        configFile: __dirname + '/karma.conf.js'
    });
});
