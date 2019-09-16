require('dotenv').config();

const urlJoin = require('url-join');

const withImages = require('next-images');
const path = require('path');
const Dotenv = require('dotenv-webpack');
const withCSS = require('@zeit/next-css');

const compose = (...funcs) => args => funcs.reduce((prev, func) => func(prev), args);

/**
 * @todo remove this nonsense when possible.
 * refer to this: https://github.com/zeit/next-plugins/issues/392
 */
function HACK_removeMinimizeOptionFromCssLoaders(config) {
  console.warn('HACK: Removing `minimize` option from `css-loader` entries in Webpack config');
  config.module.rules.forEach(rule => {
    if (Array.isArray(rule.use)) {
      rule.use.forEach(u => {
        if (u.loader === 'css-loader' && u.options) {
          delete u.options.minimize;
        }
      });
    }
  });
}

module.exports = compose(
  withImages,
  withCSS,
)({
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
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    });
    HACK_removeMinimizeOptionFromCssLoaders(config);
    return config;
  },
  publicRuntimeConfig: {
    GATEWAY_API_ROOT: process.env.GATEWAY_API_ROOT || 'http://localhost:9000',
    EGO_API_ROOT: process.env.EGO_API_ROOT || '',
    EGO_CLIENT_ID: process.env.EGO_CLIENT_ID || '',
    EGO_PUBLIC_KEY:
      process.env.EGO_PUBLIC_KEY ||
      `-----BEGIN PUBLIC KEY-----\r\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0lOqMuPLCVusc6szklNXQL1FHhSkEgR7An+8BllBqTsRHM4bRYosseGFCbYPn8r8FsWuMDtxp0CwTyMQR2PCbJ740DdpbE1KC6jAfZxqcBete7gP0tooJtbvnA6X4vNpG4ukhtUoN9DzNOO0eqMU0Rgyy5HjERdYEWkwTNB30i9I+nHFOSj4MGLBSxNlnuo3keeomCRgtimCx+L/K3HNo0QHTG1J7RzLVAchfQT0lu3pUJ8kB+UM6/6NG+fVyysJyRZ9gadsr4gvHHckw8oUBp2tHvqBEkEdY+rt1Mf5jppt7JUV7HAPLB/qR5jhALY2FX/8MN+lPLmb/nLQQichVQIDAQAB\r\n-----END PUBLIC KEY-----`,
    AUTH_DISABLED: process.env.AUTH_DISABLED || false,
    GA_TRACKING_ID: process.env.GA_TRACKING_ID || '',
    EGO_URL: urlJoin(
      process.env.EGO_API_ROOT || '',
      `/api/oauth/login/google?client_id=${process.env.EGO_CLIENT_ID}`,
    ),
  },
});
