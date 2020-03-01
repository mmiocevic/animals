'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var liveReload = require('gulp-livereload');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var uglifyJS = require('gulp-uglify');
var minifyHTML = require('gulp-htmlmin');

gulp.task('compress:sass', function (done) {
    gulp.src('app/sass/index.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('app.css'))
        .pipe(minifyCSS())
        .pipe(rename('app.min.css'))
        .pipe(gulp.dest('app/css'))
        .pipe(liveReload());

    done();
});

gulp.task('compress:js', function (done) {
    gulp.src('app/js/scripts/*.js')
        .pipe(concat('app.js'))
        .pipe(uglifyJS())
        .pipe(rename('app.min.js'))
        .pipe(gulp.dest('app/js'))
        .pipe(liveReload());

    done();
});

gulp.task('compress:html', function (done) {
    gulp.src('app/*.html')
        .pipe(rename('index.min.html'))
        .pipe(minifyHTML({collapseWhitespace: true}))
        .pipe(gulp.dest('app'));

    done();
});

gulp.task('watch', function () {
    browserSync.init({
        server: {
            baseDir: 'app/'
        }
    });
    (gulp.series('compress:sass', 'compress:js')());

    liveReload.listen();

    gulp.watch('app/sass/*.scss', gulp.series('compress:sass'));
    gulp.watch('app/js/scripts/*.js', gulp.series('compress:js'));
    gulp.watch("app/*.html").on('change', browserSync.reload);
});
