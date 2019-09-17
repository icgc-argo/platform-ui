const path = require('path');

module.exports = async ({ config }) => {
  config.node = {
    __dirname: true,
    __filename: true,
  };

  config.resolve.modules.push(path.resolve(__dirname, '../'));

  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve('awesome-typescript-loader'),
      },
      // Optional
      // {
      //   loader: require.resolve('react-docgen-typescript-loader'),
      // },
    ],
  });
  config.resolve.extensions.push('.ts', '.tsx');

  // Return the altered config
  return config;
};
