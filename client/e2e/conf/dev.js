const config = {
  src_folders: ["./e2e/tests"],
  output_folder: "./e2e/test_reports",
  webdriver: {
    start_process: true,
    server_path: "/usr/bin/chromedriver",
    port: 9515
  },

  test_settings: {
    default: {
      desiredCapabilities: {
        browserName: "chrome"
      }
    }
  }
};

module.exports = config;
