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

gulp.task('beginClean', function() {
    return $.del([config.icons.temp, config.icons.dist + 'sprite-*']);
});
gulp.task('createSprite', function() {
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
                sprite: 'sprite-icons.svg',
                render: {
                    css: {
                        template: './gulp/templates/sprite-icons.css'
                    }
                }
            }
        }
    }

    return gulp.src(config.icons.src)
        .pipe($.svgSprite(spriteConfig))
        .pipe(gulp.dest(config.icons.temp));
});

gulp.task('createPngCopy', function() {
    return gulp.src(config.icons.temp + 'css/*.svg')
        .pipe($.svg2png())
        .pipe(gulp.dest(config.icons.temp + 'css'))
});

gulp.task('copySpriteGraphic', function() {
    return gulp.src(config.icons.temp + 'css/*.{svg,png}')
        .pipe(gulp.dest(config.icons.dist.directory));
});

gulp.task('copySpriteCss', function() {
    return gulp.src(config.icons.temp + 'css/*.css')
    .pipe($.rename('_icons.scss'))
    .pipe(gulp.dest('./src/style/sprite'));
});

gulp.task('endClean', function() {
    return $.del([config.icons.temp]);
});

// TASK : SPRITE ICONS
gulp.task('sprite-icons', gulp.series('beginClean', 'createSprite', 'createPngCopy', 'copySpriteGraphic', 'copySpriteCss', 'endClean'), function(done) {

});
