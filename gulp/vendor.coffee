concat = require 'gulp-concat'
config = require './config.coffee'
gulp = require 'gulp'
newer = require 'gulp-newer'
uglify = require 'gulp-uglify'

# Move vendor files
gulp.task 'vendor', ->
  gulp.src [
    'node_modules/core-js/client/shim.min.js'
    'node_modules/zone.js/dist/zone.js'
    'node_modules/reflect-metadata/Reflect.js'
  ]
  .pipe newer(config.path + '/scripts')
  .pipe uglify()
  .pipe concat('vendor.js')
  .pipe gulp.dest(config.path + '/scripts')
