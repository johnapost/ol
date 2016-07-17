# Make sure the initial business list is displayed
initialList = (browser) ->
  browser
    .waitForElementPresent 'app md-list'
    .assert.elementPresent 'app md-list md-list-item:nth-child(50)'

module.exports =
  'Desktop: Businesses list should initially display': (browser) ->
    browser
      .resizeWindow 1025, 768
      .url browser.globals.path

    initialList browser

  'Tablet: Businesses list should initially display': (browser) ->
    browser
      .resizeWindow 601, 720
      .url browser.globals.path

    initialList browser

  'Mobile: Businesses list should initially display': (browser) ->
    browser
      .resizeWindow 480, 720
      .url browser.globals.path

    initialList browser
