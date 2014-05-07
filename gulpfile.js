var gulp = require('gulp');
var concat = require('gulp-concat');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var connect = require('gulp-connect');

gulp.task('default', ['scripts', 'libs']);

gulp.task('watch', ['default'], function () {
  gulp.watch('source/**/*', ['scripts']);
  gulp.watch('dist/*.html', ['html']);
});

gulp.task('scripts', function () {
    return browserify({
      extensions: ['.js', '.json', '.jsx']
    })
    .add('./source/init.js')
    .transform(reactify)
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(connect.reload());
});

gulp.task('html', function () {
  return gulp.src('./dist/*.html')
    .pipe(connect.reload());
});

gulp.task('libs', function () {
  return gulp.src('source/vendor/*.js')
    .pipe(concat('libs.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(connect.reload());
});

gulp.task('connect', ['watch'], function () {
  return connect.server({
    root: ['dist'],
    port: 8000,
    livereload: true
  });
});
