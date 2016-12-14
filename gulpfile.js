var gulp = require('gulp');
var $    = require('gulp-load-plugins')();

var sassPaths = [
  'bower_components/foundation-sites/scss',
  'bower_components/motion-ui/src'
];

gulp.task('sass', function() {
  return gulp.src('scss/app.scss')
    .pipe($.sass({
      includePaths: sassPaths
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(gulp.dest('css'))
    .pipe($.livereload());
});

gulp.task('html', function() {
  return gulp.src('./*.{html,htm}')
    .pipe($.livereload());
});

gulp.task('default', ['sass'], function() {
  $.livereload.listen();
  gulp.watch(['scss/**/*.{scss,sass}'], ['sass']);
  gulp.watch(['./**/*.{html,htm}'], ['html']);
});
