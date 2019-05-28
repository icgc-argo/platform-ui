const {
  WINDOWS_CHROME_LATEST,
  WINDOWS_FIREFOX_LATEST,
  WINDOWS_EDGE_LATEST,
  OSX_CHROME_LATEST,
  OSX_FIREFOX_LATEST,
  OSX_SAFARI_LATEST,
} = require('../env/browserstack');

const commonCapabilities = {
  'browserstack.user': process.env.BROWSERSTACK_USER,
  'browserstack.key': process.env.BROWSERSTACK_ACCESS_KEY,
  'browserstack.local': 'true',
  'browserstack.networkLogs': 'true',
  'browserstack.debug': 'true',
  'browserstack.networkLogs': 'true',
  'browserstack.console': 'info',
  project: process.env.BROWSERSTACK_PROJECT_NAME,
  host: process.env.BROWSERSTACK_SELENIUM_HOST,
  port: 80,
  browser: 'chrome',
};

const config = {
  src_folders: ['../tests'],
  output_folder: './e2e/test_reports',
  selenium: {
    start_process: false,
    host: process.env.BROWSERSTACK_SELENIUM_HOST,
    port: 80,
  },

  test_settings: {
    default: { desiredCapabilities: commonCapabilities },
  },
};

module.exports = config;
