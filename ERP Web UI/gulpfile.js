/// <reference path="E:\_GIT_\aquavita\Aquavita\Dev/Scripts/Libs/jquery.hotkeys.js" />
/// <reference path="E:\_GIT_\aquavita\Aquavita\Dev/Scripts/Libs/jquery.hotkeys.js" />
var gulp = require('gulp-param')(require('gulp'), process.argv),
    ts = require('gulp-typescript'),
    browserSync = require('browser-sync').create(),
    notify = require("gulp-notify"),
    replace = require('gulp-replace'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    sftp = require('gulp-sftp'),
    ftp = require('vinyl-ftp'),//require('gulp-ftp'),
    gutil = require('gulp-util'),
    convertEncoding = require('gulp-convert-encoding'),
    color = require('gulp-color'),

jsConcat = require('gulp-concat'),
jsUglify = require('gulp-uglifyjs'),

cleanCSS = require('gulp-clean-css'),
concatCSS = require('gulp-concat-css'),
gulpLess = require('gulp-less');

var tsProject = ts.createProject({
    declaration: true,
    noExternalResolve: true
});

gulp.task('browser-sync', function ()
{
    browserSync.init();
});

gulp.task('scripts-core', function ()
{
    gulp.src([
        'Dev/Scripts/Libs/jquery-3.1.1.min.js',
        'Dev/Scripts/Libs/handlebars-v4.0.5.js'
    ])
       .pipe(jsConcat('app.libs.min.js'))
       .pipe(gulp.dest('Build/Scripts/'))
       .pipe(notify('app.libs.min.js is created.'))
});

gulp.task('scripts', ['typescript'], function ()
{
    return gulp.src([
        '!Dev/Scripts/Libs/*.js',
        'Dev/Scripts/Data/*.js',
        'Dev/Scripts/Extensions/*.js',
        'Dev/Scripts/Entities/*.js',
        'Dev/Scripts/Services/*.js',
        'Dev/Scripts/Helpers/**/*.js',
        'Dev/Scripts/Components/*.js',
        'Dev/Scripts/Sections/*.js',
        'Dev/Scripts/Banners/*.js',
        'Dev/Scripts/Sliders/*.js',
        'Dev/Scripts/main.js'
    ])
        .pipe(jsConcat('app.min.js'))
        .pipe(gulp.dest('Build/Scripts/'));
});

gulp.task('typescript', function ()
{
    return gulp.src([
        'Dev/Scripts/**/*.ts'
    ])
        .pipe(ts({
            sortOutput: true
        }))
    .pipe(gulp.dest('Dev/Scripts/'));
});

gulp.task('less', function ()
{
    return gulp.src(['!Dev/Styles/login.less', 'Dev/Styles/**/*.less'])
        .pipe(gulpLess())
        .pipe(gulp.dest('Dev/Styles/'));
});

gulp.task('styles-core', ['less'], function ()
{
    return gulp.src('Dev/Styles/Libs/**/*.css')
        .pipe(concatCSS('app.libs.css'))
        .pipe(replace('/*!', '/*'))
        .pipe(cleanCSS())
        .pipe(rename('app.libs.min.css'))
        .pipe(gulp.dest('Build/Styles/'))
        .pipe(browserSync.stream());
});

gulp.task('styles', ['less'], function ()
{
    return gulp.src(['!Dev/Styles/Libs/**/*.css', 'Dev/Styles/main.css'])
        .pipe(concatCSS('app.css'))
        .pipe(cleanCSS())
        .pipe(rename('app.min.css'))
        .pipe(gulp.dest('Build/Styles/'))
        .pipe(browserSync.stream());
});

gulp.task('watch', ['styles', 'scripts'], function ()
{
    gulp.watch(['Dev/Styles/**/*.less','Dev/Styles/**/**/*.less', '!Dev/Styles/libs/*.less'], ['styles']);
    gulp.watch('Dev/Styles/libs/*.less', ['styles-core']);
    gulp.watch(['Dev/Scripts/**/*.ts', 'Dev/Scripts/JS/*.js'], ['scripts']);
});

gulp.task('default', ['styles', 'scripts', 'watch']);