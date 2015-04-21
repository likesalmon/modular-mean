'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var browserify = require('browserify');
var through2 = require('through2');
var mocha = require('gulp-mocha');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var karma = require('karma');
var protractor = require('gulp-protractor').protractor;
var webdriver = require('gulp-protractor').webdriver;
var webdriverUpdate = require('gulp-protractor').webdriver_update;

var nodeFilesToWatch = ['app.js', 'api/**/*.js'];
var nodeTestFiles = ['api/**/test/*.js', 'client/**/test/*.test.js'];

/*
    Api tasks
*/
gulp.task('mocha', function () {
    return gulp.src(nodeTestFiles, {read: false})
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
        // .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./public'));
});

gulp.task('views', function () {
    gulp.src('client/index.html')
        .pipe(gulp.dest('public/'));

    gulp.src('client/Login/*.html')
        .pipe(gulp.dest('public/Login/'));

    gulp.src('client/Dashboard/*.html')
        .pipe(gulp.dest('public/Dashboard/'));

    gulp.src('client/ToDo/*.html')
        .pipe(gulp.dest('public/ToDo/'));
});

gulp.task('sass', function () {
    gulp.src('client/sass/*.scss')
        .pipe(sass({ onError: function (err) {
            console.error(err);
        }}))
        .pipe(autoprefixer('last 2 versions', '> 1%', 'ie 8'))
        .pipe(gulp.dest('public/css/'));
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

gulp.task('build', ['browserify', 'views', 'sass'], function () {
    gutil.log('*** Run with: $ npm start ***');
});

/*
    Watchers
*/
gulp.task('unit-tests', function () {
    gulp.watch(nodeTestFiles, ['mocha']);
});

gulp.task('dev', function () {
    // gulp.watch(['app.js', 'api/**/*.js'], ['lint-api']);
    gulp.watch(nodeFilesToWatch, ['mocha']);
    gulp.watch(['client/**/*.js', '!client/test/*.js'], ['browserify', 'protractor']);
    gulp.watch(['client/**/*.html'], ['views']);
    gulp.watch(['client/sass/*.scss'], ['sass']);

    karma.server.start({
        configFile: __dirname + '/karma.conf.js'
    });
});
