previousPageButton = '.control button:first-child'
nextPageButton = '.control button:last-child'
updatePageInput = '.control md-input:first-child input'
updatePerPageInput = '.control md-input:last-child input'

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

# Update the page input
updatePage = (browser) ->
  browser
    .waitForElementPresent updatePageInput
    .clearValue updatePageInput
    .setValue updatePageInput, '2'
    .click 'md-toolbar'
    .pause 500
    .waitForElementPresent 'app md-nav-list md-list-item:nth-child(50)'
    .assert.containsText 'app md-nav-list md-list-item:last-child', '99:'

# Update the results per page input
updatePerPage = (browser) ->
  browser
    .waitForElementPresent updatePerPageInput
    .clearValue updatePerPageInput
    .setValue updatePerPageInput, '100'
    .click 'md-toolbar'
    .pause 1000
    .waitForElementPresent 'app md-nav-list md-list-item:nth-child(100)'
    .assert.containsText 'app md-nav-list md-list-item:last-child', '99:'

module.exports =
  'Users should see an initial business list': (browser) ->
    browser
      .resizeWindow 1025, 768
      .url browser.globals.path
      .pause 1000

    initialList browser

    browser.end()

  'Users should be able to move forward one page': (browser) ->
    browser
      .resizeWindow 1025, 768
      .url browser.globals.path
      .pause 1000

    nextPage browser

    browser.end()

  'Users should be able to move back one page': (browser) ->
    browser
      .resizeWindow 1025, 768
      .url browser.globals.path
      .pause 1000
      .assert.elementPresent "#{previousPageButton}[disabled]"

    nextPage browser
    previousPage browser

    browser.end()

  'Users should be able to update the page input': (browser) ->
    browser
      .resizeWindow 1025, 768
      .url browser.globals.path
      .pause 1000

    updatePage browser

    browser.end()

  'Users should be able to update the results per page input': (browser) ->
    browser
      .resizeWindow 1025, 768
      .url browser.globals.path
      .pause 1000
      .assert

    updatePerPage browser

    browser.end()
