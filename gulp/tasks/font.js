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
 * Fonts task
 */
gulp.task('fonts', function () {
    // Endless stream mode

    return $.watch(config.fonts.src, function (obj) {
        var file = new $.vinyl(obj);

        if (obj.event == 'unlink') {
            file = config.fonts.dist + path.basename(file.history[0]);
            $.del([file]);
        } else if (obj.event == 'add') {
            file = file.history[0];
            gulp.src(file)
            .pipe(gulp.dest(config.fonts.dist));
        }
    });
});