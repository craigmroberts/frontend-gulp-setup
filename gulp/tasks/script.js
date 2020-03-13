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

/**
 * JS task
 *
 * Note: you may or may not want to include the 2 below:
 * babel polyfill and jquery
 */

// TASK : SCRIPTS
gulp.task('scripts', function () {
    return $.watch(config.scripts.src, function () {
        gulp.src(config.scripts.src)
        .pipe($.babel())
        .pipe($.concat(config.scripts.dist.filename))
        .pipe(gulp.dest(config.scripts.dist.directory))
        .pipe($.rename(config.scripts.dist.filename))
        .pipe($.uglify())
        .pipe(gulp.dest(config.scripts.dist.directory));
    });
});
