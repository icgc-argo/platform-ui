const { CHROME_LATEST } = require('../env/dev');

const config = {
  src_folders: ['./e2e/tests'],
  output_folder: './e2e/test_reports',
  webdriver: {
    start_process: true,
    server_path: '/usr/bin/chromedriver',
    port: 9515,
  },

  test_settings: {
    default: {
      desiredCapabilities: {
        browserName: 'chrome',
      },
    },
    CHROME_LATEST,
  },
};

module.exports = config;
