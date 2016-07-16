istanbul = require('browserify-istanbul')

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['browserify', 'jasmine'],

    files: [
      'node_modules/core-js/client/shim.min.js',
      'node_modules/zone.js/dist/zone.js',
      'node_modules/reflect-metadata/Reflect.js',
      'node_modules/jquery/dist/jquery.min.js',
      'node_modules/velocity-animate/velocity.min.js',
      'node_modules/velocity-animate/velocity.ui.min.js',
      'node_modules/faker/build/build/faker.min.js',
      'src/app/**/*.component.ts',
      'src/app/**/*.directive.ts',
      'src/app/**/*.service.ts'
    ],

    exclude: [
    ],

    preprocessors: {
      'src/app/**/*.component.ts': ['browserify'],
      'src/app/**/*.directive.ts': ['browserify'],
      'src/app/**/*.service.ts': ['browserify']
    },

    browserify: {
      debug: true,
      transform: [
        istanbul({ignore: ['**/*.spec.js']})
      ]
    },

    coverageReporter: {
      type: 'json',
      dir: 'temp',
      subdir: function(browser) {
        return browser.toLowerCase().split(/[ /-]/)[0]
      }
    },

    reporters: ['progress', 'coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Firefox'],
    singleRun: true,
    concurrency: Infinity
  })
}
