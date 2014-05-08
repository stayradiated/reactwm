var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('default', ['scss', 'scripts']); 

gulp.task('watch', ['default'], function () {
  gulp.watch('source/**/*', ['scripts']);
  gulp.watch('stylesheets/**/*', ['scss']);
  gulp.watch('dist/*.html', ['html']);
});

gulp.task('scripts', function () {
  return browserify({
    extensions: ['.js', '.json', '.jsx']
  })
  .add('./source/init.js')
  .transform(reactify)
  .bundle()
  .on('error', console.log.bind(console))
  .pipe(source('app.js'))
  .pipe(gulp.dest('dist/js'))
  .pipe(connect.reload());
});

gulp.task('html', function () {
  return gulp.src('./dist/*.html')
    .pipe(connect.reload());
});

gulp.task('scss', function () {
  return gulp.src('./stylesheets/screen.scss')
    .pipe(sass({logErrToConsole: true}))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./dist/css'))
    .pipe(connect.reload());
});

gulp.task('connect', ['watch'], function () {
  return connect.server({
    root: ['dist'],
    port: 8000,
    livereload: true
  });
});
