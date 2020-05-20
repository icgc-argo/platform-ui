require('dotenv').config();

const urlJoin = require('url-join');

const withImages = require('next-images');
const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = withImages({
  exportPathMap: defaultPathMap =>
    process.env.EXPORT_PATH
      ? {
          '/': { page: process.env.EXPORT_PATH },
          '/404': { page: process.env.EXPORT_PATH },
        }
      : defaultPathMap,
  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty',
    };
    config.resolve.modules.push(path.resolve('./'));
    config.resolve.alias = {
      ...config.resolve.alias,
      // This asn1 nonsense is to allow the jsonwebtokens dependency `parse-asn1` to get webpacked correctly. It has a dependency called `asn1.js` and a file with the same name that webpack gets confused.
      'asn1.js': urlJoin(__dirname, '/node_modules/asn1.js/lib/asn1.js'),
    };
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
    GATEWAY_API_ROOT: process.env.GATEWAY_API_ROOT,
    EGO_API_ROOT: process.env.EGO_API_ROOT,
    EGO_CLIENT_ID: process.env.EGO_CLIENT_ID,
    EGO_PUBLIC_KEY: process.env.EGO_PUBLIC_KEY,
    AUTH_DISABLED: process.env.AUTH_DISABLED,
    GA_TRACKING_ID: process.env.GA_TRACKING_ID,
    DOCS_URL_ROOT: process.env.DOCS_URL_ROOT,
    DACO_URL: process.env.DACO_URL,
    RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY,
    FEATURE_REPOSITORY_ENABLED: process.env.FEATURE_REPOSITORY_ENABLED,
  },
});
