'use strict'
const
    config = require("../config.json"),
    pkg = require(config.package.directory),
    gulp  = require("gulp");

// load all plugins in "devDependencies" into the variable $
const $ = require("gulp-load-plugins")({
    pattern: ["*"],
    scope: ["devDependencies"]
});

gulp.task('beginClean2', function() {
    return $.del([config.logos.temp, config.logos.dist + 'sprite-*']);
});
gulp.task('createSprite2', function() {
    var spriteConfig = {
        shape: {
            dimension: { // Set maximum dimensions
                maxWidth: 20,
                maxHeight: 20
            },
            spacing: {
                padding: 1
            }
        },
        mode: {
            css: {
                variables: {
                        replaceSvgWithPng: function() {
                            return function(sprite, render) {
                                return render(sprite).split('.svg').join('.png');
                            }
                        }
                },
                sprite: 'sprite-logos.svg',
                render: {
                    css: {
                        template: './gulp/templates/sprite-logos.css'
                    }
                }
            }
        }
    }

    return gulp.src(config.logos.src)
        .pipe($.svgSprite(spriteConfig))
        .pipe(gulp.dest(config.logos.temp));
});

gulp.task('createPngCopy2', function() {
    return gulp.src(config.logos.temp + 'css/*.svg')
        .pipe($.svg2png())
        .pipe(gulp.dest(config.logos.temp + 'css'))
});

gulp.task('copySpriteGraphic2', function() {
    return gulp.src(config.logos.temp + 'css/*.{svg,png}')
        .pipe(gulp.dest(config.logos.dist.directory));
});

gulp.task('copySpriteCss2', function() {
    return gulp.src(config.logos.temp + 'css/*.css')
    .pipe($.rename('_logos.scss'))
    .pipe(gulp.dest('./src/style/sprite'));
});

gulp.task('endClean2', function() {
    return $.del([config.logos.temp]);
});

// TASK : SPRITE LOGOS
gulp.task('sprite-logos', gulp.series('beginClean2', 'createSprite2', 'createPngCopy2', 'copySpriteGraphic2', 'copySpriteCss2', 'endClean2'), function(done) {

});
