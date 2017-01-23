//
//start
let gulp = require('gulp');

let docs = '.';
//
let distDir =  docs + '/dist';
let srcDir =  docs + '/src';
//
let assetsDir = srcDir + '/assets';
let DistAssetsDir = distDir + '/assets';
//
let path = {
  'imgPath': assetsDir + '/images',
  'sassPath': assetsDir + '/sass',
  'cssPath': assetsDir + '/css',
  'jsPath': assetsDir + '/js'
};
//
let distPath = {
  'imgPath': DistAssetsDir + '/images',
  'sassPath': DistAssetsDir + '/sass',
  'cssPath': DistAssetsDir + '/css',
  'jsPath': DistAssetsDir + '/js'
};
//
// plugin
//
let plumber = require('gulp-plumber'); // error escape
let rename = require('gulp-rename'); // rename
let sourcemaps = require('gulp-sourcemaps'); // sourcemap
let gulpSequence = require('gulp-sequence'); // sequence
//
let autoprefixer = require('gulp-autoprefixer'); // prefix
let sass = require('gulp-compass'); // Sass compass
let csscomb = require('gulp-csscomb'); // css
let cssmin = require('gulp-cssmin'); // css min
let frontnote = require('gulp-frontnote'); // style guide
//
let uglify = require('gulp-uglify'); // js min
let babel = require('gulp-babel'); // es6
let concat = require('gulp-concat'); // concat ... order.JSON
let eslint = require('gulp-eslint'); // eslint
//
let ejs = require('gulp-ejs'); // ejs template
let minifyHtml = require('gulp-minify-html'); // html min
//
let browser = require('browser-sync'); // browser start
//
let imagemin = require('gulp-imagemin'); // image min
let pngquant = require('imagemin-pngquant');
//
let notify = require('gulp-notify'); // alert
let watch = require("gulp-watch");  // watch
//
let del = require('del'); // delete
//
let fs = require('graceful-fs'); // JSON load
let cache = require('gulp-cached'); // cache
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
    .pipe(autoprefixer({
      browsers: ['last 2 version', 'iOS >= 8.1', 'Android >= 4.4.4'],
      cascade: false
    }))
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
let jsJson = JSON.parse(fs.readFileSync(path.jsPath + '/order.json'));
let jsList = [];

for (let i = 0; i < jsJson.order.length; i++) {
  jsList[i] = path.jsPath + jsJson.order[i];
}
//
gulp.task('js.babel', function() {
  return gulp.src(path.jsPath + '/**/*babel.js')
    .pipe(plumber({ errorHandler: notify.onError('<%= error.message %>') }))
    .pipe(eslint({useEslintrc: true}))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(babel())
    .pipe(rename(function (path) {
       let cutLength = path.basename.length - 6;
       path.basename = path.basename.slice(0, cutLength);
    }))
    .pipe(gulp.dest(path.jsPath + '/babel/'))
});
gulp.task('js.concat', function() {
  return gulp.src(jsList.join(',').split(','))
    .pipe(plumber({ errorHandler: notify.onError('<%= error.message %>') }))
    .pipe(concat('index.js'))
    .pipe(gulp.dest(distPath.jsPath + '/'))
    .pipe(notify('js task finished'));
});

gulp.task('js.uglify', function() {
  return gulp.src(distPath.jsPath + '/index.js')
    .pipe(plumber({ errorHandler: notify.onError('<%= error.message %>') }))
    .pipe(sourcemaps.init())
    .pipe(uglify({preserveComments: 'some'}))
    .pipe(sourcemaps.write())
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
