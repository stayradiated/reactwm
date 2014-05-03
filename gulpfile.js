var gulp = require('gulp');
var concat = require('gulp-concat');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var connect = require('gulp-connect');

gulp.task('default', ['scripts', 'libs']);

gulp.task('scripts', function () {
  return browserify('./source/app.js')
    .transform(reactify)
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(connect.reload());
});

gulp.task('libs', function () {
  return gulp.src('source/vendor/*.js')
    .pipe(concat('libs.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(connect.reload());
});

gulp.task('connect', function () {
  return connect.server({
    root: ['dist'],
    port: 8000,
    livereload: true
  });
});
