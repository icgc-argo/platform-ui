var webdriver = require("selenium-webdriver"),
  By = webdriver.By,
  until = webdriver.until;

var driver = new webdriver.Builder().forBrowser("chrome").build();

driver.get("http://www.duckduckgo.com");

driver.findElement(By.id("search_form_input_homepage")).sendKeys("webdriver");
driver.findElement(By.id("search_button_homepage")).click();

driver.sleep(2000).then(function() {
  driver.getTitle().then(function(title) {
    if (title === "webdriver - Google Search") {
      console.log("Test passed", title);
    } else {
      console.log("Test failed", title);
    }
    driver.quit();
  });
});
