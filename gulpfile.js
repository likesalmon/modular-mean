'use strict';

var gulp = require('gulp');
// var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var transform = require('vinyl-transform');
var rename = require('gulp-rename');
var browserify = require('browserify');
var mocha = require('gulp-mocha');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
// var minifyCSS = require('gulp-minify-css');
var karma = require('karma');
var protractor = require('gulp-protractor').protractor;
var webdriver = require('gulp-protractor').webdriver;
// var webdriver_standalone = webdriver.webdriver_standalone;
var webdriverUpdate = require('gulp-protractor').webdriver_update;

var nodeFilesToWatch = ['app.js', 'api/**/*.js'];
var nodeTestFiles = ['api/**/test/*.js'];

/*
    Api tasks
*/
gulp.task('mocha', function () {
    return gulp.src(nodeTestFiles, {read: false})
        .pipe(mocha({reporter: 'spec'}));
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
        // .pipe(uglify())
        .pipe(rename('bundle.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./public'))
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

gulp.task('webdriver-update', webdriverUpdate);
gulp.task('webdriver', webdriver);

// gulp.task('webdriver_standalone', webdriver_standalone);

gulp.task('protractor', ['webdriver-update', 'webdriver'], function () {

    return gulp.src('client/**/test/*.e2e.js')
        .pipe(protractor({
            configFile: './protractor.conf.js',
            args: ['--baseUrl', 'http://127.0.0.1:3000']
        }))
        .on('error', function(err) {
            // Make sure failed tests cause gulp to exit non-zero
            throw err;
        });

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
    karma.server.start({
        configFile: __dirname + '/karma.conf.js'
    });
});
