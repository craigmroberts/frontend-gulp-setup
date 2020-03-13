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
gulp.task('createSprite', gulp.series('beginClean'), function(done) {
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
        .pipe($.svgSprites(spriteConfig))
        .pipe(gulp.dest(config.icons.temp));
});

gulp.task('createPngCopy', gulp.series('createSprite'), function(done) {
    return gulp.src(config.icons.temp + 'styles/*.svg')
        .pipe($.svg2png())
        .pipe(gulp.dest(config.icons.temp + 'styles'))
});

gulp.task('copySpriteGraphic', gulp.series('createPngCopy'), function(done) {
    return gulp.src(config.icons.temp + 'styles/**/*.{svg,png}')
        .pipe(gulp.dest(config.icons.dist));
});

gulp.task('copySpriteCss', gulp.series('createSprite'), function(done) {
    return gulp.src(config.icons.temp + 'styles/**/*.css')
    .pipe($.rename('_sprite-icons.scss'))
    .pipe(gulp.dest('./src/scss'));
});

gulp.task('endClean', gulp.series('copySpriteGraphic', 'copySpriteCss'), function(done) {
    return $.del([config.icons.temp]);
});

gulp.task('icons', gulp.series('beginClean', 'createSprite', 'createPngCopy', 'copySpriteGraphic', 'copySpriteCss', 'endClean'), function(done) {

});

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