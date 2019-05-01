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

module.exports = {
  "Demo test homepage": function(browser) {
    browser
      .url("http://localhost:8080")
      .waitForElementVisible("body")
      .click(".card:nth-of-type(2)")
      .pause(1000)
      .assert.containsText("h1", "Minh")
      .end();
  },

  "Demo local storage": function(browser) {
    browser
      .url("http://localhost:8080")
      .waitForElementVisible("body")
      .execute(
        function() {
          console.log(
            "executing function but were in a browser so none of these console logs will be show"
          );
          const token = window.localStorage.getItem("test");
          console.log("token", token);
          return token;
        },
        [],
        function(result) {
          console.log("Our execute script finished", result);
        }
      )
      .end();
  }
};
