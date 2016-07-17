previousPageButton = '.control button:first-child'
nextPageButton = '.control button:last-child'

# Make sure the initial business list is displayed
initialList = (browser) ->
  browser
    .waitForElementPresent 'app md-nav-list md-list-item'
    .assert.elementPresent 'app md-nav-list md-list-item:nth-child(50)'

# Click the previous page button
previousPage = (browser) ->
  browser
    .waitForElementPresent previousPageButton
    .click previousPageButton
    .waitForElementPresent 'app md-nav-list md-list-item:nth-child(50)'
    .assert.containsText 'app md-nav-list md-list-item:last-child', '49:'

# Click the next page button
nextPage = (browser) ->
  browser
    .waitForElementPresent nextPageButton
    .click nextPageButton
    .waitForElementPresent 'app md-nav-list md-list-item:nth-child(50)'
    .assert.containsText 'app md-nav-list md-list-item:last-child', '99:'

module.exports =
  'Users should see an initial business list': (browser) ->
    browser
      .resizeWindow 1025, 768
      .url browser.globals.path

    initialList browser

    browser.end()

  'Users should be able to move forward one page': (browser) ->
    browser
      .resizeWindow 1025, 768
      .url browser.globals.path

    nextPage browser

    browser.end()

  'Users should be able to move back one page': (browser) ->
    browser
      .resizeWindow 1025, 768
      .url browser.globals.path
      .assert.elementPresent "#{previousPageButton}[disabled]"

    nextPage browser
    previousPage browser

    browser.end()
