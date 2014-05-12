var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var reactify = require('reactify');
var connect = require('gulp-connect');
var browserify = require('browserify');
var streamify = require('gulp-streamify');
var source = require('vinyl-source-stream');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('default', ['bundle', 'example']); 

gulp.task('bundle', function () {
  return browserify({ extensions: ['.js', '.json', '.jsx'] })
  .add('./source/index.jsx')
  .exclude('react')
  .exclude('react/addons')
  .exclude('lodash')
  .exclude('jquery')
  .exclude('signals')
  .transform(reactify)
  .bundle({ standalone: 'ReactWM' })
  .on('error', console.log.bind(console))
  .pipe(source('reactwm.min.js'))
  .pipe(streamify(uglify()))
  .pipe(gulp.dest('./'));
});

gulp.task('example', ['example/scripts', 'example/stylesheets']);

gulp.task('example/watch', ['example'], function () {
  gulp.watch('./source/**/*', ['example/scripts']);
  gulp.watch('./example/*.scss', ['example/stylesheets']);
});

gulp.task('example/scripts', function () {
  return browserify({
    extensions: ['.js', '.json', '.jsx']
  })
  .add('./example/app.jsx')
  .transform(reactify)
  .bundle()
  .on('error', console.log.bind(console))
  .pipe(source('app.js'))
  .pipe(gulp.dest('./example/dist/js'))
  .pipe(connect.reload());
});

gulp.task('example/stylesheets', function () {
  return gulp.src('./example/screen.scss')
    .pipe(sass({errLogToConsole: true}))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./example/dist/css'))
    .pipe(connect.reload());
});

gulp.task('example/connect', ['example/watch'], function () {
  return connect.server({
    root: ['example/dist'],
    port: 8000,
    livereload: true
  });
});
