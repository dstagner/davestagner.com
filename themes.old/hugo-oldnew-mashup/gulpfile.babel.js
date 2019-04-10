/*!  Copyright (C) 2007,2017-2018 Daniel F. Dickinson <thecshore.thecshore.com>
 *   Released under the MIT License
 */

// ---- JSHint linter settings
/* jshint undef: true, unused: true, strict: global, esversion: 6 */
/* globals require: false */
"use strict";

//   Script to set, save and restore stylesheet choice for site
//   and to create smooth font resizing based on browser window size

// The information used to write this script comes from
//   http://www.alistapart.com/articles/alternate, however I wrote the script
//   myself.
//

var gulp = require("gulp");
var babel = require("gulp-babel");
var concat = require("gulp-concat");
var sourcemaps = require("gulp-sourcemaps");
var rename = require('gulp-rename');
var fs = require('graceful-fs');
var yarn = require('gulp-yarn');
var evstr = require('event-stream');
var tar = require('gulp-tar');
var gzip = require('gulp-gzip');
var zip = require('gulp-zip');
var jshint = require('gulp-jshint');
var eslint = require('gulp-eslint');
var csslint = require('gulp-csslint');
var postcss = require('gulp-postcss');
var cssImport = require('postcss-import');
var cssnext = require('postcss-cssnext');
var cleancss = require('gulp-clean-css');
var uglify = require('gulp-uglify');

gulp.task('yarn', function () {
  return evstr.concat(
    gulp.src(['./modules/package.json'])
      .pipe(gulp.dest('./modules'))
      .pipe(yarn({
        production: true,
        flat: true,
        noBinLinks: true,
        ignoreScripts: true,
        nonInteractive: true}))
  );
});

gulp.task('js', ['js-test'], function (cb) {
  var pkg = JSON.parse(fs.readFileSync('./package.json'));
  return evstr.concat(
    gulp.src([
      "src/js/*.js",
      "src/js/modules/*/src/*.js",
      "!src/js/*-min.js",
      "!src/js/*.min.js"
    ])
      .pipe(sourcemaps.init())
      .pipe(babel())
      .pipe(concat(pkg.name + ".js"))
      .pipe(gulp.dest("assets/dist/js"))
      .pipe(uglify({output: { comments: "/^!/"}}))
      .pipe(rename({extname: '-min.js'}))
      .pipe(sourcemaps.write("."))
      .pipe(gulp.dest("assets/dist/js"))
  );
});

gulp.task('release', ['js'], function() {
  var pkg = JSON.parse(fs.readFileSync('./package.json'));
  return evstr.concat(
    gulp.src([
      "assets/dist/**/*.js",
      "!assets/dist/**/*-min.js",
    ])
   .pipe(rename({basename: pkg.name + "-" + pkg.version}))
   .pipe(gulp.dest('release/' + pkg.name + '-' + pkg.version + '/')),
  gulp.src([
      "assets/dist/**/*-min.*",
    ])
   .pipe(rename({basename: pkg.name + "-" + pkg.version + '-min'}))
   .pipe(gulp.dest('release/' + pkg.name + '-' + pkg.version + '/')),
  gulp.src([
    "release/" + pkg.name + "-" + pkg.version + '/'
  ])
    .pipe(tar(pkg.name + "-" + pkg.version + '.tar'))
    .pipe(gzip())
    .pipe(gulp.dest('release')),
  gulp.src([
    "release/" + pkg.name + "-" + pkg.version + '/'
  ])
    .pipe(zip(pkg.name + "-" + pkg.version + '.zip'))
  );
});

gulp.task('css', ['css-test'], function() {
  var plugins = [
     cssImport({path: ["src/css/imports"]}),
     cssnext()
  ];
  return evstr.concat(
    gulp.src([
      "src/css/modules/normalize.css/normalize.css",
      "src/css/modules/github-fork-ribbon-css/gh-fork-ribbon.css",
      "src/css/*-syntax.css",
      "src/css/*-base.css",
   ])
    .pipe(sourcemaps.init())
    .pipe(postcss(plugins,{
       browsers: ['>5%']
     }))
    .pipe(gulp.dest('build/separated/css/base'))
    .pipe(concat("base.css"))
    .pipe(cleancss({ level: 2, compatibility: 'ie8' }))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest('assets/dist/css')),
  gulp.src([
      "src/css/*-base-color.css",
   ])
    .pipe(sourcemaps.init())
    .pipe(postcss(plugins,{
       browsers: ['>5%']
     }))
    .pipe(gulp.dest('build/separated/css/base-color'))
    .pipe(sourcemaps.write("."))
    .pipe(concat("base-color.css"))
    .pipe(cleancss({ level: 2, compatibility: 'ie8' }))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest('assets/dist/css')),
  gulp.src([
      "src/css/*-base-modern.css",
      "src/css/*-base-modern-ie11.css",
   ])
    .pipe(sourcemaps.init())
    .pipe(postcss(plugins,{
       browsers: ['>5%']
     }))
    .pipe(gulp.dest('build/separated/css/base-modern'))
    .pipe(sourcemaps.write("."))
    .pipe(concat("base-modern.css"))
    .pipe(cleancss({ level: 2, compatibility: '*' }))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest('assets/dist/css')),
  gulp.src([
      "src/css/*-base-modern-color.css",
   ])
    .pipe(sourcemaps.init())
    .pipe(postcss(plugins,{
       browsers: ['>5%']
     }))
    .pipe(gulp.dest('build/separated/css/base-modern-color'))
    .pipe(sourcemaps.write("."))
    .pipe(concat("base-modern-color.css"))
    .pipe(cleancss({ level: 2, compatibility: '*' }))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest('assets/dist/css')),
  gulp.src([
      "src/css/*-base-ie8/*.css",
      "src/css/modules/github-fork-ribbon-css/gh-fork-ribbon.ie.css",
   ])
    .pipe(postcss(plugins,{
       browsers: ['>5%']
     }))
    .pipe(gulp.dest('build/separated/css/base-ie8'))
    .pipe(sourcemaps.write("."))
    .pipe(concat('base-ie8.css'))
    .pipe(cleancss({ level: 2, compatibility: 'ie8' }))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest('assets/dist/css'))
  );
});

gulp.task('js-test', function() {
  return evstr.concat(
    gulp.src([
      "src/js/*.js"
    ])
      .pipe(babel())
      .pipe(gulp.dest("build/lint/js"))
      .pipe(jshint())
      .pipe(jshint.reporter('default'))
      .pipe(jshint.reporter('fail'))
      .pipe(eslint({useElintrc: true, rules: {
         'indent': 0
       }}))
      .pipe(eslint.format())
      .pipe(eslint.failAfterError())
  );
});

gulp.task('css-test', ['yarn'], function() {
  var plugins = [
     cssImport({path: ["src/css/imports"]}),
     cssnext()
  ];
  return evstr.concat(
    gulp.src([
      "src/css/modules/normalize.css/normalize.css",
      "src/css/modules/github-fork-ribbon-css/gh-fork-ribbon.css",
      "src/css/modules/github-fork-ribbon-css/gh-fork-ribbon.ie.css",
      "src/css/*-syntax.css",
      "src/css/*-base*.css",
   ])
    .pipe(postcss(plugins,{
       browsers: ['>5%'],
       clean: {
         level: 2,
         compatibility: 'ie8'
       }
   }))
    .pipe(gulp.dest("build/lint/css"))
    .pipe(csslint())
    .pipe(csslint(csslint.formatter('fail')))
  );
});

gulp.task('test', ['js-test','css-test']);
gulp.task('build', ['js','css']);
gulp.task('default', ['test','build']);
gulp.task('watch', function() {
  gulp.watch([
    'src/**/*.css',
    'src/**/*.js',
    'gulpfile.babel.js'
   ],
   ['build']);
});
