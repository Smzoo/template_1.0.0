//
//start
var gulp = require('gulp');

var docs = '.';
//
var distDir =  docs + '/dist';
var srcDir =  docs + '/src';
//
var assetsDir = srcDir + '/assets';
var DistAssetsDir = distDir + '/assets';
//
var path = {
  'imgPath': assetsDir + '/images',
  'sassPath': assetsDir + '/sass',
  'cssPath': assetsDir + '/css',
  'jsPath': assetsDir + '/js'
};
//
var distPath = {
  'imgPath': DistAssetsDir + '/images',
  'sassPath': DistAssetsDir + '/sass',
  'cssPath': DistAssetsDir + '/css',
  'jsPath': DistAssetsDir + '/js'
};
//
// plugin
//
var plumber = require('gulp-plumber'); // error escape
var rename = require('gulp-rename'); // rename
var sourcemaps = require('gulp-sourcemaps'); // sourcemap
var gulpSequence = require('gulp-sequence'); // sequence
//
var autoprefixer = require('gulp-autoprefixer'); // prefix
var sass = require('gulp-compass'); // Sass compass
var csscomb = require('gulp-csscomb'); // css
var cssmin = require('gulp-cssmin'); // css min
var frontnote = require('gulp-frontnote'); // style guide
//
var uglify = require('gulp-uglify'); // js min
var babel = require('gulp-babel'); // es6
var concat = require('gulp-concat'); // concat ... order.JSON
//
var ejs = require('gulp-ejs'); // ejs template
var minifyHtml = require('gulp-minify-html'); // html min
//
var browser = require('browser-sync'); // browser start
//
var imagemin = require('gulp-imagemin'); // image min
var pngquant = require('imagemin-pngquant');
//
var notify = require('gulp-notify'); // alert
var watch = require("gulp-watch");  // watch
//
var del = require('del'); // delete
//
var fs = require('graceful-fs'); // JSON load
var cache = require('gulp-cached'); // cache
//
//
//
//
//
//
//
//
// server
gulp.task('browser', function () {
  browser({ server: { baseDir: distDir + '/' } });
});
//
//
//
// Sass
/////////////////////////////
gulp.task('sass', function () {
  gulp.src(path.sassPath + '/**/*.scss')
    .pipe(plumber({ errorHandler: notify.onError('<%= error.message %>') }))
    .pipe(sass({
      config_file: 'config.rb',
      sass: path.sassPath,
      css: path.cssPath,
      image: path.imgPath
    }))
    //.pipe(frontnote({ out: path.cssPath }))
    .pipe(autoprefixer('last 3 version'))
    .pipe(csscomb())
    .pipe(gulp.dest(distPath.cssPath + '/'))
    .pipe(cssmin())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(distPath.cssPath + '/'))
    .pipe(browser.reload({ stream: true }))
    .pipe(notify('css task finished'));
});
//
//
//
// js
/////////////////////////////
var jsJson = JSON.parse(fs.readFileSync(path.jsPath + '/order.json'));
var jsList = [];

for (var i = 0; i < jsJson.order.length; i++) {
  jsList[i] = path.jsPath + jsJson.order[i];
}
//
gulp.task('js.babel', function() {
  return gulp.src(path.jsPath + '/**/*babel.js')
    .pipe(plumber({ errorHandler: notify.onError('<%= error.message %>') }))
    .pipe(babel())
    .pipe(rename(function (path) {
       var cutLength = path.basename.length - 6;
       path.basename = path.basename.slice(0, cutLength);
    }))
    .pipe(gulp.dest(path.jsPath + '/babel/'));
});
gulp.task('js.concat', function() {
  return gulp.src(jsList.join(',').split(','))
    .pipe(plumber({ errorHandler: notify.onError('<%= error.message %>') }))
    .pipe(concat('index.js'))
    .pipe(gulp.dest(distPath.jsPath + '/'));
});

gulp.task('js.uglify', function() {
  return gulp.src(distPath.jsPath + '/index.js')
    .pipe(plumber({ errorHandler: notify.onError('<%= error.message %>') }))
    //.pipe(sourcemaps.init())
    .pipe(uglify())
    //.pipe(sourcemaps.write())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(distPath.jsPath + '/'))
    .pipe(browser.reload({ stream: true }))
    .pipe(notify('js task finished'));
});
//
gulp.task('js', function(callback) {
  gulpSequence('js.babel', 'js.concat', 'js.uglify')(callback)
});
//
//
//
//
// ejs html compail
/////////////////////////////
gulp.task('ejs.init', function(){
  return gulp.src([srcDir + '/**/*.ejs','!' + srcDir + '/**/*_*.ejs'])
    .pipe(plumber({ errorHandler: notify.onError('<%= error.message %>') }))
    .pipe(ejs({data: JSON.parse(fs.readFileSync(srcDir + '/common/' + 'data.json'))}))
    //.pipe(minifyHtml())
    .pipe(rename({extname: '.html'}))
    .pipe(gulp.dest(distDir + '/'))
    .pipe(notify('html task finished'));
});
//
gulp.task('ejs.reload', ['ejs.init'], function(){
  return browser.reload();
});
//
gulp.task('ejs', ['ejs.init', 'ejs.reload']);
//
//
//
// image
/////////////////////////////
//gulp.task('images', function () {
//  gulp.src(path.imgPath + '/**/*.{png,jpg,gif,svg}')
//    .pipe(plumber({ errorHandler: notify.onError('<%= error.message %>')}))
//    //.pipe(cache( imagemin( [pngquant({quality: '60-80', speed: 1})] )))
//    .pipe(gulp.dest(distPath.imgPath + '/'))
//    .pipe(browser.reload({ stream: true }));
//});

gulp.task('images.min', function () {
  return gulp.src(path.imgPath + '/**/*.{png,jpg,gif,svg}')
    .pipe(plumber({ errorHandler: notify.onError('<%= error.message %>')}))
    //.pipe(cache( imagemin( [pngquant({quality: '60-80', speed: 1})] )))
    .pipe(gulp.dest(distPath.imgPath + '/'))
});
//
gulp.task('images.reload', ['images.min'], function(){
  return browser.reload();
});
//
gulp.task('images', ['images.min', 'images.reload']);
//
//
//
// watch
/////////////////////////////
gulp.task('default', ['browser'], function () {
  watch([path.jsPath + '/**/*.js', '!' + path.jsPath + '/babel/**/*.js'], function(event){ gulp.start(['js']) });
  watch([path.sassPath + '/**/*.scss'], function(event){ gulp.start(['sass']) });
  watch([srcDir + '/**/*.ejs'], function(event){ gulp.start(['ejs']) });
  watch([path.imgPath + '/**/*.{png,jpg,gif,svg}'], function(event){ gulp.start(['images']) });
});
//
//
//
// release
/////////////////////////////
gulp.task('copy', function () {
  gulp.src(distDir + '/**/*')
    .pipe(gulp.dest('release/01'));
});

gulp.task('delete', function () {
  gulp.src('release/01')
    del(['release/**/*.LCK', 'release/**/*_notes', 'release/**/Templates/']);
});
