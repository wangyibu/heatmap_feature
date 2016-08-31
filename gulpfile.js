// Sass configuration
var gulp = require('gulp'),
    watch = require("gulp-watch"),
    ts = require('gulp-typescript'),
    changed = require('gulp-changed'),
    tsProject = ts.createProject('tsconfig.json');
var sass = require('gulp-sass');


gulp.task('sass', function() {
    gulp.src('style/**/*.sass')
        .pipe(sass())
        .pipe(gulp.dest(function(f) {
            return f.base;
        }))
});


gulp.task('develop-ts_single_compile', function() {
    return gulp.src(['**/*.ts', '!node_modules/**/*.ts'])
        .pipe(ts(tsProject))
        .pipe(gulp.dest("."));
});


gulp.task('default', ['sass'], function() {
    gulp.watch('style/**/*.sass', ['sass']);
    gulp.watch('**/*.ts', ['develop-ts_single_compile']);
})