'use strict';

var gulp = require('gulp');
var mocha = require('gulp-mocha');
var nodeFilesToWatch = ['app.js', 'api/**/*.js'];
var nodeTestFiles = ['api/**/test/*.js'];

gulp.task('mocha', function () {
    return gulp.src(nodeTestFiles, {read: false})
        .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('test', function () {
    gulp.watch(nodeFilesToWatch, ['mocha']);
});
