/*module.exports = {
  "Demo test Google": function(browser) {
    browser
      .url("http://www.google.com")
      .waitForElementVisible("body")
      .setValue("input[type=text]", "nightwatch")
      .waitForElementVisible("input[name=btnK]")
      .click("input[name=btnK]")
      .pause(1000)
      .assert.containsText("#main", "Night Watch")
      .end();
  }
};
*/

const bs = require("../helpers");
module.exports = {
  "Demo test homepage": browser => {
    //const sessionId = bs.updateStatus(browser);

    browser
      .url("http://localhost:8080")
      .waitForElementVisible("body")
      .click(".card:nth-of-type(2)")
      .assert.title("Google")
      .pause(5000)
      .assert.containsText("h1", "Minh")
      .end();
  },

  afterEach: (browser, done) => {
    const result = browser.currentTest.results;
    // manual failure check for external APIs
    if (result.failed > 0) {
      const err = result.lastError.message;
      bs.updateStatus(browser, "failed", err);
    }
    done();
  }
};

/*
// remote working check
module.exports = {
  "BrowserStack Local Testing": function(browser) {
    browser
      .url("http://bs-local.com:45691/check")
      .waitForElementVisible("body", 1000)
      .pause(5000)
      .assert.containsText("body", "Up and running")
      .end();
  }
};
*/
