const path = require("path");

module.exports = {
  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: "empty"
    };
    config.module.rules = [
      ...config.module.rules,
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: "gql-loader"
      }
    ];

    return config;
  }
};
