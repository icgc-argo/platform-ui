const path = require('path');

module.exports = async ({ config }) => {
  config.node = {
    __dirname: true,
    __filename: true,
  };

  config.resolve.modules.push(path.resolve(__dirname, '../'));

  // Return the altered config
  return config;
};
