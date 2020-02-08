// Gulp loader

const {
    src,
    dest,
    series,
    parallel
} = require('gulp');

// --------------------------------------------
// Dependencies
// --------------------------------------------

// CSS / SASS plugins
let gulp = require('gulp');
let sass = require('gulp-sass');
let autoprefixer = require('gulp-autoprefixer');
let minifycss = require('gulp-clean-css');

// JSS / plugins
let uglify = require('gulp-uglify');

// Utility plugins
let concat = require('gulp-concat');
let del = require('del');
let plumber = require('gulp-plumber');
let sourcemaps = require('gulp-sourcemaps');
let rename = require('gulp-rename');

// Browser plugins
let browserSync = require('browser-sync').create();

// Images plugins
let images = require('gulp-imagemin');


// Project Variables

let styleSrc = 'source/sass/**/*.sass';
let styleDest = 'build/assets/css/';

let vendorSrc = 'source/js/vendors/';
let vendorDest = 'build/assets/js/';

let scriptSrc = 'source/js/*.js';
let scriptDest = 'build/assets/js/';

let htmlSrc = 'source/';
let htmlDest = 'build/*.html';


// --------------------------------------------
// Stand Alone Tasks
// --------------------------------------------

// COMPILE SASS FILES TO CSS
function style() {
  // 1. where is the SASS file
  return gulp.src('./source/sass/**/*.sass')
  // 2. pass that file through SASS compiler
  .pipe(sass( {
    style: 'compressed'
  }))
  // 3. rename to main.min.class
  .pipe(rename({
    basename: 'maintwo'
  }))
  // 4. where do I save the compiled CSS?
  .pipe(gulp.dest('build/assets/css'))
  // 5. stream changes to all browser
  .pipe(browserSync.stream());
}

// WATCH FOR AUTOMATIC UPDATES
function watch() {
  browserSync.init( {
    server: {
      baseDir: './build'
    }
  });
  gulp.watch(styleSrc, style)
  gulp.watch(htmlDest).on('change', browserSync.reload);
  gulp.watch(scriptSrc).on('change', browserSync.reload);
}

// COMPRESS IMAGES
function img(done) {
    gulp.src('source/img/*')
        .pipe(images())
        .pipe(dest('build/assets/img'));
        done();
};

exports.style = style;
exports.watch = watch;
exports.img = img;
