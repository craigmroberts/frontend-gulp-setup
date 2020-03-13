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

var php = require('gulp-connect-php');

gulp.task('php', function(){
    php.server({base:'./', port:8010, keepalive:true});
});

gulp.task('browsersync', gulp.series('php'), function(done) {
    browserSync.init({
        proxy:"localhost:8010",
        baseDir: "./",
        open:true,
        notify:false
    });
});

gulp.task('dev', gulp.series('browsersync'), function(done) {
    gulp.watch('./*.php', browserSync.reload);
});