require("dotenv").config();

const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = {
  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: "empty"
    };
    config.resolve.modules.push(path.resolve("./"));
    config.plugins = [
      ...config.plugins,
      new Dotenv({ path: path.join(__dirname, "/.env") })
    ];
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
