/**
 * Generate capabilities: https://www.browserstack.com/automate/capabilities
 */

/**
 * Windows
 */

const WINDOWS_CHROME_LATEST = {
  desiredCapabilities: {
    os: 'Windows',
    os_version: '10',
    browserName: 'Chrome',
  },
};

const WINDOWS_FIREFOX_LATEST = {
  desiredCapabilities: {
    os: 'Windows',
    os_version: '10',
    browserName: 'Firefox',
  },
};

const WINDOWS_EDGE_LATEST = {
  desiredCapabilities: {
    os: 'Windows',
    os_version: '10',
    browserName: 'Edge',
  },
};

/**
 * OSX
 */

const OSX_CHROME_LATEST = {
  desiredCapabilities: {
    os: 'OS X',
    os_version: 'Mojave',
    browserName: 'Chrome',
  },
};

const OSX_FIREFOX_LATEST = {
  desiredCapabilities: {
    os: 'OS X',
    os_version: 'Mojave',
    browserName: 'Firefox',
  },
};

const OSX_SAFARI_LATEST = {
  desiredCapabilities: {
    os: 'OS X',
    os_version: 'Mojave',
    browserName: 'Safari',
  },
};

const env = {
  WINDOWS_CHROME_LATEST,
  WINDOWS_EDGE_LATEST,
  WINDOWS_FIREFOX_LATEST,
  OSX_CHROME_LATEST,
  OSX_FIREFOX_LATEST,
  OSX_SAFARI_LATEST,
};

module.exports = env;
