'use strict';
const
    config = require("../config.json"),
    pkg = require(config.package.directory),
    gulp = require("gulp");

// load all plugins in "devDependencies" into the variable $
const $ = require("gulp-load-plugins")({
    pattern: ["*"],
    scope: ["devDependencies"]
});

// TASK: STYLES
gulp.task('styles', function () {

    return $.watch(config.styles.src, function () {

        gulp.src(config.styles.src)
        .pipe($.sourcemaps.init())
        .pipe($.sass().on('error', $.sass.logError))
        .pipe($.sass({ outputStyle: 'compressed' }).on('error', $.sass.logError)) // COMPRESS STYLES
        .pipe($.autoprefixer())
        .pipe($.rename(config.styles.dist.filename))
        .pipe($.replace('"{{', '{{')) // SHOPIFY LIQUID
        .pipe($.replace('}}"', '}}')) // SHOPIFY LIQUID
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest(config.styles.dist.directory));
    });
});
