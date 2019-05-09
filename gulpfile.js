'use strict';

var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var webp = require('gulp-webp');
var svgstore = require('gulp-svgstore');
var plumber = require('gulp-plumber');
var sourcemap = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var posthtml = require('gulp-posthtml');
var include = require('posthtml-include');
var htmlmin = require('gulp-htmlmin');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var csso = require('gulp-csso');
var order = require('gulp-order');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var del = require('del');
var ghPages = require('gh-pages');
var server = require('browser-sync').create();

gulp.task('imagemin', function () {
  return gulp.src('source/img/**/*.{png,jpg,svg}')
    .pipe(imagemin([
      imagemin.optipng({
        optimizationLevel: 3
      }),
      imagemin.jpegtran({
        progressive: true
      }),
      imagemin.svgo({
        plugins: [
          {removeViewBox: false}
        ]
      })
    ]))
    .pipe(gulp.dest('source/img'));
});

gulp.task('webp', function () {
  return gulp.src('source/img/**/!(bg-*).{png,jpg}')
    .pipe(webp({
      quality: 90
    }))
    .pipe(gulp.dest('source/img'));
})

gulp.task('sprite', function () {
  return gulp.src('source/img/icon-*.svg')
    .pipe(imagemin([
      imagemin.svgo({
        plugins: [
          {removeAttrs: {attrs: '(fill|stroke)'}}
        ]
      })
    ]))
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('build/img'));
})

gulp.task('html', function () {
  return gulp.src('source/*.html')
    .pipe(posthtml([
      include()
    ]))
    .pipe(htmlmin(
      {collapseWhitespace: true}
    ))
    .pipe(gulp.dest('build'));
})

gulp.task('css', function () {
  return gulp.src('source/sass/style.scss')
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest('source/css'))
    .pipe(csso())
    .pipe(rename(function (path) {
      path.basename += '.min';
    }))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('build/css'))
    .pipe(server.stream());
});

gulp.task('js-concat', function () {
  return gulp.src('source/js/modules/**/*.js')
    .pipe(order([
      'fix-ie-min-height.js',
      '*.js'
    ]))
    .pipe(concat('app.js'))
    .pipe(gulp.dest('source/js'));
});

gulp.task('js-min', function () {
  return gulp.src([
    'source/js/app.js',
    'source/js/lib/**/*.js'
  ])
    .pipe(uglify())
    .pipe(rename(function (path) {
      path.basename += '.min';
    }))
    .pipe(gulp.dest('build/js'));
});

gulp.task('js', gulp.series('js-concat', 'js-min'));

gulp.task('copy', function () {
  return gulp.src([
    'source/fonts/**/*.{woff,woff2}',
    'source/img/**'
  ], {
    base: 'source'
  })
    .pipe(gulp.dest('build'));
});

gulp.task('clean', function () {
  return del('build');
});

gulp.task('server', function () {
  server.init({
    server: 'build/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('source/sass/**/*.{scss,sass}', gulp.series('css'));
  gulp.watch(['source/js/modules/**/*.js','source/js/lib/**/*.js'], gulp.series('js', 'reload'));
  gulp.watch('source/img/icon-*.svg', gulp.series('sprite', 'html', 'reload'));
  gulp.watch('source/*.html', gulp.series('html', 'reload'));
});

gulp.task('reload', function (done) {
  server.reload();
  done();
});

gulp.task('build', gulp.series(
  'clean',
  'copy',
  'css',
  'js',
  'sprite',
  'html'
));

gulp.task('start', gulp.series('build', 'server'));

gulp.task('deploy', function (cb) {
  ghPages.publish('build', cb);
});
