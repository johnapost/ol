helloWorld = (browser) ->
  browser
    .assert.containsText 'app', 'Hello World'
    .end()

module.exports =
  'Desktop: Hello World should display': (browser) ->
    browser
      .resizeWindow 1025, 768
      .url browser.globals.path

    helloWorld browser

  'Tablet: Hello World should display': (browser) ->
    browser
      .resizeWindow 601, 720
      .url browser.globals.path

    helloWorld browser

  'Mobile: Hello World should display': (browser) ->
    browser
      .resizeWindow 480, 720
      .url browser.globals.path

    helloWorld browser
