require('dotenv').config();

const urlJoin = require('url-join');

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
  publicRuntimeConfig: {
    GATEWAY_API_ROOT: process.env.GATEWAY_API_ROOT || 'http://localhost:9000',
    EGO_API_ROOT: process.env.EGO_API_ROOT || '',
    EGO_CLIENT_ID: process.env.EGO_CLIENT_ID || '',
    AUTH_DISABLED: process.env.AUTH_DISABLED || false,
    GA_TRACKING_ID: process.env.GA_TRACKING_ID || '',
    EGO_URL: urlJoin(
      process.env.EGO_API_ROOT,
      `/api/oauth/login/google?client_id=${process.env.EGO_CLIENT_ID}`,
    ),
  },
});
