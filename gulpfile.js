'use strict';

// modules
var assemble = require('fabricator-assemble');
var browserSync = require('browser-sync');
var csso = require('gulp-csso');
var del = require('del');
var gulp = require('gulp');
var gutil = require('gulp-util');
var gulpif = require('gulp-if');
var imagemin = require('gulp-imagemin');
//var rev = require('gulp-rev');
//var RevAll = require('gulp-rev-all');
var prefix = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var reload = browserSync.reload;
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var webpack = require('webpack');


// configuration
var config = {
    dev: gutil.env.dev,
    src: {
        scripts: {
            fabricator: './src/assets/fabricator/scripts/fabricator.js',
            toolkit: './src/assets/toolkit/scripts/toolkit.js'
        },
        styles: {
            fabricator: 'src/assets/fabricator/styles/fabricator.scss',
            toolkit: 'src/assets/toolkit/styles/toolkit.scss'
        },
        webfonts: 'src/assets/toolkit/styles/webfonts/**/*',
        images: {
            fabricator: 'src/assets/fabricator/images/**/*',
            toolkit: 'src/assets/toolkit/images/**/*'
        },
        views: 'src/toolkit/views/*.html',
        flibs: 'src/assets/fabricator/scripts/libs/**',
        libs: 'src/assets/toolkit/scripts/libs/**'

    },
    dest: 'dist',
    mainifest: {
        name: 'manifest.json'
    },
    revision: {
        src: {
            assets: [
                'src/assets/toolkit/styles/toolkit.scss',
                'src/assets/fabricator/styles/fabricator.scss',
                'src/assets/fabricator/images/**',
                'src/assets/toolkit/images/**',
                'src/views/**'
            ],
            dist: [
                'dist/assets/fabricator/images/**/*',
                'dist/assets/fabricator/scripts/f.js',
                'dist/assets/fabricator/styles/f.css',
                'dist/assets/toolkit/styles/toolkit.css',
                'dist/assets/toolkit/fonts/**',
                'dist/assets/toolkit/images/**/*',
                'dist/assets/toolkit/scripts/libs/**',
                'dist/assets/toolkit/scripts/toolkit.js',
                'dist/*.html',
                'dist/pages/*.html'
            ]
        }
    }


};


// webpack
var webpackConfig = require('./webpack.config')(config);
var webpackCompiler = webpack(webpackConfig);


// clean
gulp.task('clean', function(cb) {
    del([config.dest], cb);
});

// styles
gulp.task('styles:fabricator', function() {
    gulp.src(config.src.styles.fabricator)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(prefix('last 2 version'))
        .pipe(gulpif(!config.dev, csso()))
        .pipe(rename('f.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.dest + '/assets/fabricator/styles'))
        .pipe(gulpif(config.dev, reload({ stream: true })));
});

gulp.task('styles:toolkit', function() {
    gulp.src(config.src.styles.toolkit)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(prefix('last 2 version'))
        .pipe(gulpif(!config.dev, csso()))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.dest + '/assets/toolkit/styles'))
        .pipe(gulpif(config.dev, reload({ stream: true })));
});

gulp.task('styles', ['styles:fabricator', 'styles:toolkit']);


// scripts
gulp.task('scripts', function(done) {
    webpackCompiler.run(function(error, result) {
        if (error) {
            gutil.log(gutil.colors.red(error));
        }
        result = result.toJson();
        if (result.errors.length) {
            result.errors.forEach(function(error) {
                gutil.log(gutil.colors.red(error));
            });
        }
        done();
    });
});


// images
gulp.task('images:fabricator', ['favicon'], function() {
    return gulp.src(config.src.images.fabricator)
        .pipe(imagemin())
        .pipe(gulp.dest(config.dest + '/assets/fabricator/images'));
});

gulp.task('images:toolkit', ['favicon'], function () {
    return gulp.src(config.src.images.toolkit)
        .pipe(imagemin())
        .pipe(gulp.dest(config.dest + '/assets/toolkit/images'));
});

gulp.task('images', ['images:fabricator', 'images:toolkit']);

gulp.task('favicon', function() {
    return gulp.src('./src/fv-favicon.ico')
        .pipe(gulp.dest(config.dest));
});

// fabricator scripts
gulp.task('flibs', function() {
    return gulp.src(config.src.flibs)
        .pipe(gulp.dest(config.dest + '/assets/fabricator/scripts/libs'));
});

// libs
gulp.task('libs', function() {
    return gulp.src(config.src.libs)
        .pipe(gulp.dest(config.dest + '/assets/toolkit/scripts/libs'));
});

// webfonts
gulp.task('webfonts', function() {
    return gulp.src(config.src.webfonts)
        .pipe(gulp.dest(config.dest + '/assets/toolkit/styles/webfonts/'));
});

var helpers = require('handlebars');


helpers.registerHelper('parsejson', function(data, options) {
    return options.fn(JSON.parse(data));
});


// assemble
gulp.task('assemble', function(done) {
    assemble({
        logErrors: config.dev
    });
    done();
});


// server
gulp.task('serve', function() {

    browserSync({
        server: {
            baseDir: config.dest
        },
        notify: false,
        logPrefix: 'FABRICATOR'
    });

    /**
     * Because webpackCompiler.watch() isn't being used
     * manually remove the changed file path from the cache
     */
    function webpackCache(e) {
        var keys = Object.keys(webpackConfig.cache);
        var key, matchedKey;
        for (var keyIndex = 0; keyIndex < keys.length; keyIndex++) {
            key = keys[keyIndex];
            if (key.indexOf(e.path) !== -1) {
                matchedKey = key;
                break;
            }
        }
        if (matchedKey) {
            delete webpackConfig.cache[matchedKey];
        }
    }

    gulp.task('assemble:watch', ['assemble'], reload);
    gulp.watch('src/**/*.{html,md,json,yml}', ['assemble:watch']);

    gulp.task('styles:fabricator:watch', ['styles:fabricator']);
    gulp.watch('src/assets/fabricator/styles/**/*.scss', ['styles:fabricator:watch']);

    gulp.task('styles:toolkit:watch', ['styles:toolkit']);
    gulp.watch('src/assets/toolkit/styles/**/*.scss', ['styles:toolkit:watch']);

    gulp.task('scripts:watch', ['scripts'], reload);
    // gulp.task('scripts:watch', ['libs'], reload);
    gulp.watch('src/assets/{fabricator,toolkit}/scripts/**/*.js', ['scripts:watch']).on('change', webpackCache);

    gulp.task('images:fabricator:watch', ['images:fabricator'], reload);
    gulp.watch(config.src.images.fabricator, ['images:fabricator:watch']);

    gulp.task('images:toolkit:watch', ['images:toolkit'], reload);
    gulp.watch(config.src.images.toolkit, ['images:toolkit:watch']);
});


var tasks = [
    'styles',
    'scripts',
    'images',
    'assemble',
    'webfonts',
    'flibs',
    'libs',
];
// default build task
gulp.task('default', ['clean'], function() {

    // define build tasks

    // run build
    runSequence(tasks, function() {
        if (config.dev) {
            gulp.start('serve');
        }
    });
});

//deploy task
gulp.task('deploy', tasks, function(cb) {
    var revOptions = {
        dontRenameFile: ['.html'],
        dontUpdateReference: ['.html']
    };
    //clean
    del(['deploy'], cb);

    gulp.src(config.revision.src.dist)
        .pipe(RevAll.revision(revOptions))
        .pipe(gulp.dest('deploy'))
        .pipe(RevAll.manifestFile())
        .pipe(gulp.dest('deploy'));

});