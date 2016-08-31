// Sass configuration
var gulp = require('gulp');
var sass = require('gulp-sass');


gulp.task('sass', function() {
    gulp.src('style/**/*.sass')
        .pipe(sass())
        .pipe(gulp.dest(function(f) {
            return f.base;
        }))
});

gulp.task('default', ['sass'], function() {
    gulp.watch('style/**/*.sass', ['sass']);
})
