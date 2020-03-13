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

// TASK : ICONS
gulp.task('icons', function () {
    // Endless stream mode

    return $.watch(config.icons.src, function (obj) {
        var file = new $.vinyl(obj);

        if (obj.event == 'unlink') {
            file = config.icons.dist + 'icon-' + path.basename(file.history[0]);
            $.del([file]);
        } else if (obj.event == 'add') {
            file = file.history[0];
            gulp.src(file)
            .pipe($.imagemin({
                progressive: true
            }))
            .pipe($.rename(function (path) {
                // Updates the object in-place
                path.basename = "icon-" + path.basename;
            }))
            .pipe(gulp.dest(config.icons.dist));
        }
    });
});