business = 'app md-nav-list md-list-item:first-child'
businessCard = 'app md-card'

# Click the first business item
firstBusiness = (browser) ->
  browser
    .waitForElementPresent business
    .click business
    .waitForElementPresent businessCard
    .assert.containsText businessCard, 'Address'
    .assert.containsText businessCard, 'Call'
    .assert.containsText businessCard, 'Website'

module.exports =
  "Users should be able to see the first business' details": (browser) ->
    browser
      .resizeWindow 1025, 768
      .url browser.globals.path

    firstBusiness browser

    browser.end()
