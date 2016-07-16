gulp = require 'gulp'
browserSync = require 'browser-sync'
config = require './config.coffee'
nodemon = require 'gulp-nodemon'

gulp.task 'serve', ['sass'], ->
  browserSync
    server: {baseDir: config.path}
    port: 4000
    open: false
    reloadOnRestart: false
    ghostMode: true
    notify: false

  gulp.watch ['src/**/*.ts', 'server/**/*.ts'], ['tsLint']
  gulp.watch ['server/**/*.ts'], ['tsTranspileServer']
  gulp.watch(
    ['src/**/*.scss', '!src/components/**/*.scss'],
    ['sass', 'scssLint']
  )
  gulp.watch(
    ['!src/**/*.scss', 'src/components/**/*.scss'],
    ['sassComponents', 'scssLint', browserSync.reload]
  )
  gulp.watch 'src/**/*.jade', ['jade', browserSync.reload]

module.exports = gulp
