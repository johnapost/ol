businessList = 'app md-nav-list'
business = 'app md-nav-list md-list-item:first-child'
businessCard = 'app md-card'
backButton = 'app button'

# Click the first business item
firstBusiness = (browser) ->
  browser
    .waitForElementPresent business
    .click business
    .waitForElementPresent businessCard
    .assert.urlEquals 'http://localhost:4000/business/0'
    .assert.containsText businessCard, 'Address'
    .assert.containsText businessCard, 'Call'
    .assert.containsText businessCard, 'Website'

# Click the back button
back = (browser) ->
  browser
    .waitForElementPresent backButton
    .click backButton
    .waitForElementPresent businessList
    .assert.urlEquals 'http://localhost:4000/'

module.exports =
  "Users should be able to see the first business' details": (browser) ->
    browser
      .resizeWindow 1025, 768
      .url browser.globals.path
      .pause 1000

    firstBusiness browser
    back browser

    browser.end()
