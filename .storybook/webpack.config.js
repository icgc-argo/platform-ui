const path = require('path');
const { TsConfigPathsPlugin } = require('awesome-typescript-loader');

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
      use: [
        {
          loader: require.resolve('awesome-typescript-loader'),
          options: {
            configFileName: path.resolve(__dirname, 'tsconfig.json'),
          },
        },
        {
          loader: require.resolve('react-docgen-typescript-loader'),
        },
      ],
    },
  ];
  config.resolve.extensions = [...(config.resolve.extensions || []), '.ts', '.tsx'];

  // Return the altered config
  return config;
};
