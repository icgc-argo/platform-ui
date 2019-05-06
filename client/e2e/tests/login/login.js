const bs = require("../../helpers");

module.exports = {
  desiredCapabilities: {
    name: "Login"
  },
  "Demo user login": browser => {
    browser
      .url("http://localhost:8080")
      .waitForElementVisible("body")
      .click(".card:nth-of-type(2)")
      .pause(5000)
      .assert.containsText("h1", "Minh")
      .end();
  },

  afterEach: (browser, done) => {
    const result = browser.currentTest.results;
    // manual failure check for browserstack API call
    if (result.failed > 0) {
      const err = result.lastError.message;
      bs.updateStatus(browser, "failed", err);
    }
    done();
  }
};
