'use strict'

const browserify = require('browserify')
const electronPackager = require('gulp-atom-electron')
const gulp = require('gulp')
const babel = require('gulp-babel')
const electron = require('electron-connect').server.create()
const es = require('event-stream')
const glob = require('glob')
const rename = require('gulp-rename')
const source = require('vinyl-source-stream')
const symdest = require('gulp-symdest')
const zip = require('gulp-vinyl-zip')

const electronVersion = require('electron-prebuilt/package.json').version

/**
 * Bundle JS
 */
gulp.task('build-js-bundles', (done) => {
  glob('./app/js/*.js', (err, files) => {
    if (err) done(err)

    let tasks = files.map((entry) => {
      return browserify({ entries: [entry] })
        .transform('babelify', { presets: [ 'es2015', 'react' ] })
        .bundle()
        .pipe(source(entry))
        .pipe(rename({
          dirname: '/'
        }))
        .pipe(gulp.dest('./app/dist'))
    })

    es.merge(tasks).on('end', done)
  })
})

/**
 * Serve - for development
 */
gulp.task('serve', ['build-js-bundles'], () => {
  electron.start();
  gulp.watch(['./js/**/*.js'], ['build-js-bundles']);
  gulp.watch(['./src/index.js', './app/**/*.html', './app/dist/*.js', './app/**/*.css'], electron.restart);
})

/**
 * Build and Package for each OS
 */
gulp.task('package-osx', ['build-js-bundles'], () => {
  return gulp.src('./app/**')
    .pipe(electronPackager({ version: electronVersion, platform: 'darwin' }))
    .pipe(symdest('release'))
})

gulp.task('package-windows', ['build-js-bundles'], () => {
  return gulp.src('./app/**')
    .pipe(electronPackager({ version: electronVersion, platform: 'win32' }))
    .pipe(zip.dest('./release/windows.zip'))
})

gulp.task('package-linux', ['build-js-bundles'], () => {
  return gulp.src('./app/**')
    .pipe(electronPackager({ version: electronVersion, platform: 'linux' }))
    .pipe(zip.dest('./release/linux.zip'))
})

gulp.task('package', ['package-windows', 'package-osx', 'package-linux'])
