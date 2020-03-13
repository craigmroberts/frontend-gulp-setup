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

// TASK : FAVICONS
gulp.task('favicons', function () {
       // Endless stream mode

    return gulp.src(config.favicons.src)
        .pipe(
            $.favicons({
                appName: config.site.name,
                appShortName: config.site.name,
                appDescription: config.site.description,
                developerName: config.site.developer,
                developerURL: config.site.developerUrl,
                background: '#020307',
                path: '',
                url: config.site.url,
                display: 'standalone',
                orientation: 'portrait',
                scope: '/',
                start_url: '/?homescreen=1',
                version: 1.0,
                logging: false,
                html: 'index.html',
                pipeHTML: true,
                replace: true,
            })
        )
        .pipe(gulp.dest(config.favicons.dist));
});