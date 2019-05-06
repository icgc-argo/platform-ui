const commonCapabilities = {
  "browserstack.user": process.env.BROWSERSTACK_USER,
  "browserstack.key": process.env.BROWSERSTACK_ACCESS_KEY,
  "browserstack.local": "true",
  "browserstack.networkLogs": "true",
  project: "argo-platform"
};

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
        browser: "chrome"
      }
    }
  }
};

// Copy common capabilites
for (var i in nightwatch_config.test_settings) {
  var config = nightwatch_config.test_settings[i];
  config["selenium_host"] = nightwatch_config.selenium.host;
  config["selenium_port"] = nightwatch_config.selenium.port;
  config["browserstack.user"] = commonCapabilities["browserstack.user"];
  config["browserstack.key"] = commonCapabilities["browserstack.key"];
  config["browserstack.local"] = commonCapabilities["browserstack.local"];
  config["project"] = commonCapabilities.project;
}
