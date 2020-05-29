// Gulp loader

const {
  src,
  dest,
  series,
  parallel
} = require('gulp')

// --------------------------------------------
// Dependencies
// --------------------------------------------

// CSS / SASS plugins
const gulp = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const minifycss = require('gulp-clean-css')

// JSS / plugins
const uglify = require('gulp-uglify')

// Utility plugins
const concat = require('gulp-concat')
const del = require('del')
const plumber = require('gulp-plumber')
const sourcemaps = require('gulp-sourcemaps')
const rename = require('gulp-rename')

// Browser plugins
const browserSync = require('browser-sync').create()

// Images plugins
const images = require('gulp-imagemin')

// Project Variables

const styleSrc = 'source/sass/**/*.sass'
const styleDest = 'build/assets/css/'

const vendorSrc = 'source/js/vendors/'
const vendorDest = 'build/assets/js/'

const scriptSrc = 'source/js/*.js'
const scriptDest = 'build/assets/js/'

const htmlSrc = 'source/'
const htmlDest = 'build/*.html'

// --------------------------------------------
// Stand Alone Tasks
// --------------------------------------------

// COMPILE SASS FILES TO CSS
function style () {
  // 1. where is the SASS file
  return gulp.src('./source/sass/**/*.sass')
  // 2. pass that file through SASS compiler
    .pipe(sass({
      style: 'compressed'
    }))
  // 3. rename to main.min.class
    .pipe(rename({
      basename: 'maintwo'
    }))
  // 4. where do I save the compiled CSS?
    .pipe(gulp.dest('build/assets/css'))
  // 5. stream changes to all browser
    .pipe(browserSync.stream())
}

// WATCH FOR AUTOMATIC UPDATES
function watch () {
  browserSync.init({
    server: {
      baseDir: './build'
    }
  })
  gulp.watch(styleSrc, style)
  gulp.watch(htmlDest).on('change', browserSync.reload)
  gulp.watch(scriptSrc).on('change', browserSync.reload)
}

// COMPRESS IMAGES
function img (done) {
  gulp.src('source/img/*')
    .pipe(images())
    .pipe(dest('build/assets/img'))
  done()
};

exports.style = style
exports.watch = watch
exports.img = img
