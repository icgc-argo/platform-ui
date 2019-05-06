module.exports = {
  src_folders: ["../tests"],
  selenium: {
    start_process: false,
    host: "hub-cloud.browserstack.com",
    port: 80
  },

  test_settings: {
    default: {
      desiredCapabilities: {
        "browserstack.user": process.env.BROWSERSTACK_USER,
        "browserstack.key": process.env.BROWSERSTACK_ACCESS_KEY,
        "browserstack.local": true,
        browser: "chrome",
        selenium_host: "hub-cloud.browserstack.com",
        selenium_port: 80
      }
    }
  }
};

/*
// CLEAN THIS UP, do we need it in both places???
// Code to copy seleniumhost/port into test settings
for (var i in nightwatch_config.test_settings) {
  var config = nightwatch_config.test_settings[i];
  config["selenium_host"] = nightwatch_config.selenium.host;
  config["selenium_port"] = nightwatch_config.selenium.port;
}
*/
