const path = require('path');

module.exports = async ({ config }) => {
  config.node = {
    __dirname: true,
    __filename: true,
  };

  config.resolve.modules = [...(config.resolve.modules || []), path.resolve(__dirname, '../')];

  config.module.rules = [
    ...(config.module.rules || []),
    {
      test: /\.(ts|tsx)$/,
      exclude: /(node_modules)/,
      use: [
        {
          loader: require.resolve('react-docgen-typescript-loader'),
        },
        {
          loader: require.resolve('babel-loader'),
          options: {
            presets: [
              ['@babel/preset-typescript', { isTSX: true, allExtensions: true }],
              [
                '@emotion/babel-preset-css-prop',
                {
                  autoLabel: true,
                },
              ],
            ],
          },
        },
      ],
    },
  ];
  config.resolve.extensions = [...(config.resolve.extensions || []), '.ts', '.tsx'];

  // Return the altered config
  return config;
};
