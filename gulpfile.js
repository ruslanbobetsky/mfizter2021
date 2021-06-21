const { src, dest, watch, parallel, series } = require('gulp');

const scss = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const del = require('del');


function browsersync() {
   browserSync.init({
      server: {
         baseDir: 'app/'
      },
      port: 8080
   });
}

function cleanDist() {
   return del('dist')
}

function scripts() {
   return src([

      'node_modules/jquery/dist/jquery.js',
      'node_modules/wowjs/dist/wow.js',
      'app/js/main.js',
   ])
      .pipe(concat('main.min.js'))
      .pipe(uglify())
      .pipe(dest('app/js'))
      .pipe(browserSync.stream())
}

// function js() {
//    return src([
//       'node_modules/wowjs/dist/wow.js'
//    ])
//       .pipe(concat('libs.min.js'))
//       .pipe(uglify())
//       .pipe(dest('app/js'))
//       .pipe(browserSync.stream())
// };

function styles() {
   return src([
      'app/scss/style.scss',
   ])
      .pipe(scss({ outputStyle: 'compressed' }))
      .pipe(concat('style.min.css'))
      .pipe(autoprefixer({
         overrideBrowserslist: ['last 10 version'],
         grid: true
      }))
      .pipe(dest('app/css'))
      .pipe(browserSync.stream())
}


function css() {
   return src('node_modules/animate.css/animate.css')
      .pipe(concat('_libs.scss'))
      .pipe(dest('app/scss'))
      .pipe(browserSync.stream())
}

function images() {
   return src('app/img/**/*')

      .pipe(imagemin([
         imagemin.gifsicle({ interlaced: true }),
         imagemin.mozjpeg({ quality: 75, progressive: true }),
         imagemin.optipng({ optimizationLevel: 5 }),
         imagemin.svgo({
            plugins: [
               { removeViewBox: true },
               { cleanupIDs: false }
            ]
         })
      ]))
      .pipe(dest('dist/img'))
}

function build() {
   return src([
      'app/css/style.min.css',
      'app/fonts/**/*',
      'app/js/main.min.js',
      'app/*.html'
   ], { base: 'app' })
      .pipe(dest('dist'))
}

function watching() {
   watch(['app/scss/**/*.scss'], styles);
   watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
   watch(['app/*.html']).on('change', browserSync.reload);
}

exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.images = images;
exports.css = css;
//exports.js = js;
exports.cleanDist = cleanDist;

exports.build = series(cleanDist, images, build);

exports.default = parallel(css, styles, scripts, browsersync, watching);