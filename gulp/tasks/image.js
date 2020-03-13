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

// TASK : IMAGES
gulp.task('images', function () {
    // Endless stream mode

    return $.watch(config.images.src, function (obj) {
        console.log('running images');
        var file = new $.vinyl(obj);

        if (obj.event == 'unlink') {
            file = config.images.dist + path.basename(file.history[0]);
            $.del([file]);
        } else if (obj.event == 'add') {
            file = file.history[0];
            gulp.src(file)
            .pipe(gulp.dest(config.images.dist));
        }
    });
});