var gulp = require('gulp');
var react = require('gulp-react');

var sass = require('gulp-sass');
var connect = require('gulp-connect');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var reactify = require('reactify');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('default', ['package']); 

gulp.task('package', function () {
  return gulp.src('lib/**/*.js*')
  .pipe(react())
  .pipe(gulp.dest('pkg'));
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
