const path = require('path');
const glob = require('glob');

const sourceDir = path.resolve(__dirname, './uikit/dist/');
const sourceFilesPath = path.resolve(sourceDir, './**/*.jsx');
const outPath = path.resolve(sourceDir, './dist');
const tsconfigPath = path.resolve(__dirname, './tsconfig.uikit.json');

const getFiles = () =>
  new Promise((resolve, reject) =>
    glob(sourceFilesPath, (err, files) => {
      if (err) {
        reject(err);
      }
      resolve(files);
    }),
  );

module.exports = async () => {
  const allFiles = await getFiles();
  const entries = allFiles.reduce(
    (acc, filePath) => ({
      ...acc,
      [filePath.replace(sourceDir, '').replace('.jsx', '')]: filePath,
    }),
    {},
  );
  return {
    entry: entries,
    output: {
      path: sourceDir,
    },
    context: sourceDir,
    resolve: {
      alias: {
        uikit: sourceDir,
      },
      extensions: ['.js', '.jsx', '.svg'],
    },
    module: {
      rules: [
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'assets',
              },
            },
          ],
        },
        {
          test: /\.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-react',
                ['@emotion/babel-preset-css-prop', { autoLabel: true }],
              ],
              plugins: [
                '@babel/plugin-transform-react-jsx',
                '@babel/plugin-proposal-optional-chaining',
                '@babel/plugin-proposal-object-rest-spread',
              ],
            },
          },
        },
      ],
    },
  };
};
