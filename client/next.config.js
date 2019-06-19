require('dotenv').config();

const withImages = require('next-images');
const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = withImages({
  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty',
    };
    config.resolve.modules.push(path.resolve('./'));
    config.plugins = [...config.plugins, new Dotenv({ path: path.join(__dirname, '/.env') })];
    config.module.rules = [
      ...config.module.rules,
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
      },
    ];

    return config;
  },
  env: {
    ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    API_ROOT: process.env.API_ROOT,
    EGO_API_ROOT: process.env.EGO_API_ROOT,
    EGO_CLIENT_ID: process.env.EGO_CLIENT_ID,
  },
});
