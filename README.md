OL!
===

[![Codeship Status for johnapost/ol](https://codeship.com/projects/55899290-2eb8-0134-dc79-4a25dba64f1f/status?branch=master)](https://codeship.com/projects/163734)
[![Code Climate](https://codeclimate.com/github/johnapost/ol/badges/gpa.svg)](https://codeclimate.com/github/johnapost/ol)
[![Test Coverage](https://codeclimate.com/github/johnapost/ol/badges/coverage.svg)](https://codeclimate.com/github/johnapost/ol/coverage)
[![Issue Count](https://codeclimate.com/github/johnapost/ol/badges/issue_count.svg)](https://codeclimate.com/github/johnapost/ol)

Getting Started
---------------

You will need NPM, Gulp.js and Typings.

Download Node.JS [here](http://nodejs.org/) for your OS. NPM comes with Node.JS. This project was created with Node v5.9.0, other versions are untested.

Enter the following in your console when pointed at the project directory:

    npm i gulp typings -g
    npm i

Enter ```gulp``` and you will be able to visit ```http:///localhost:4000``` and see the project.

Tests
-----

Unit tests: ```karma start --single-run```
e2e tests: ```gulp e2e && nightwatch -e chrome```

Run both the unit tests and e2e tests with ```npm test```. This requires that all dependencies are properly installed and JDK is present on the system. Download your JDK for your OS [here](http://www.oracle.com/technetwork/java/javase/downloads/index.html).

Built with
----------

* Client
  * Angular 2 RC 4 - JS Framework along with its dependencies
  * Material Design for Angular 2 - CSS Framework

* Dev
  * TypeScript - Typed JavaScript superset
  * CoffeeScript - JS preprocessor (for gulp and nightwatch)
  * Pug/Jade - HTML preprocessor
  * SCSS - CSS preprocessor
  * gulp.js - Task automation
  * Browserify - JS bundler

* Testing
  * Karma - Test runner
  * Jasmine - Test framework
  * Faker - Fake test data
  * Istanbul - Code coverage
  * NightwatchJS - E2E tests with Selenium

* Linting
  * TSLint
  * scss-lint
  * CoffeeLint

* CI
  * Codeship - CI provider
  * Code Climate - Static analysis
