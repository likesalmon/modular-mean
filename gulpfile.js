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
// var uglify = require('gulp-uglify');
var karma = require('karma');
var protractor = require('gulp-protractor').protractor;
var webdriver = require('gulp-protractor').webdriver;
var webdriverUpdate = require('gulp-protractor').webdriver_update;

/*
    Paths
*/
var paths = {
    api: {
        tests: ['api/**/test/*.js'],
        scripts: ['app.js', 'api/**/*.js']
    },
    client: {
        images: ['client/images/**/*'],
        sass: ['client/sass/*.scss'],
        scripts: ['client/**/*.js', '!client/**/test/*.js'],
        tests: ['client/**/test/*.test.js'],
        e2e: ['client/**/test/*.e2e.js'],
        views: [ // Just the module name, ex.: ToDo
            'ToDo'
        ]
    }
};


/*
    Api tasks
*/
function mochaSingleRun () {
    return gulp.src(paths.api.tests, {read: false})
        .pipe(mocha({reporter: 'spec'}))
        .on('end', function () {
            gutil.log('\n\n***** Mocha Tests Complete *****\n\n\n\n');
        });
}

gulp.task('mocha', mochaSingleRun);


function lintApi () {
    return gulp.src(paths.api.scripts)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
}

gulp.task('lint-api', lintApi);


gulp.task('api-test-watcher', function () {
    gulp.watch(paths.api.scripts, ['mocha']);
});

/*
    Client tasks
*/
function bundle () {
    return gulp.src(['./client/main.js'])
        .pipe(through2.obj(function (file, enc, next) {
            browserify(file.path)
                .bundle(function (err, res) {
                    file.contents = res;
                    next(null, file);
                });
        }))
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(rename('bundle.js'))
        // .pipe(uglify()) // adds 5+ seconds to build
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./public'));
}

gulp.task('browserify', bundle);


function views () {
    gulp.src('client/index.html')
        .pipe(gulp.dest('public/'));

    paths.client.views.forEach(function (dir) {
        gulp.src('client/' + dir + '/*.html')
            .pipe(gulp.dest('public/' + dir + '/'));
    });
}

gulp.task('views', views);


function css () {
    return gulp.src(paths.client.sass)
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
}

gulp.task('compass', css);


function images () {
    return gulp.src(paths.client.images)
        .pipe(gulp.dest('public/images/'));
}

gulp.task('images', images);


function lintClient () {
    return gulp.src(paths.client.scripts.concat(paths.client.e2e))
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
}

gulp.task('lint-client', lintClient);


function protractorSingleRun () {
    return gulp.src(paths.client.e2e)
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
}

gulp.task('webdriver-update', webdriverUpdate);
gulp.task('webdriver', webdriver);
gulp.task('protractor', ['webdriver-update', 'webdriver'], protractorSingleRun);


function karmaWatch () {
    karma.server.start({
        configFile: __dirname + '/karma.conf.js'
    });
}

gulp.task('karma', karmaWatch);

function karmaSingleRun () {
    karma.server.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    });
}

gulp.task('karma-single-run', karmaSingleRun);


/*
    Build
*/

gulp.task('clean', function (cb) {
    del(['public/**/*'], cb);
});

gulp.task('build', ['clean'], function () {
    bundle();
    css();
    images();
    views();
});


/*
    Single run test
*/

gulp.task('test', ['clean'], function () {
    bundle();
    css();
    images();
    views();
    karmaSingleRun();
    protractorSingleRun();
    mochaSingleRun();
});


/*
    Dev
*/

gulp.task('dev', function () {
    karmaWatch();
    gulp.watch(paths.client.scripts, ['browserify']);
    gulp.watch(paths.client.e2e, ['protractor']);
    gulp.watch(paths.client.images, ['images']);
    gulp.watch(paths.client.views, ['views']);
    gulp.watch(paths.client.sass, ['compass']);
    gulp.watch(paths.api.scripts, ['mocha']);
});
