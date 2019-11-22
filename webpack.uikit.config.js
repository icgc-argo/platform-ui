const path = require('path');
const glob = require('glob');
const baseTsConfig = require('./tsconfig.json');

const SOURCE_EXTENSION = 'tsx';
const sourceDir = path.resolve(__dirname, './uikit');
const sourceFilesPath = path.resolve(sourceDir, `./**/*.${SOURCE_EXTENSION}`);
const outPath = path.resolve(sourceDir, './dist');
const tsConfigPath = path.resolve(__dirname, 'tsconfig.uikit.json');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const EXCLUDE_REGEX = /.*(testSetup|testUtil|plopfile|stories)\..*$/;

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
  const entries = allFiles
    .filter(file => !file.match(EXCLUDE_REGEX))
    .reduce(
      (acc, filePath) => ({
        ...acc,
        [filePath.replace(sourceDir, '').replace(`.${SOURCE_EXTENSION}`, '')]: filePath,
      }),
      {},
    );
  return {
    entry: entries,
    output: {
      path: outPath,
    },
    context: sourceDir,
    resolve: {
      alias: {
        uikit: sourceDir,
      },
      extensions: ['.ts', '.tsx', '.svg', '.md', '.js'],
      modules: [nodeModulesPath],
    },
    module: {
      rules: [
        {
          test: /\.(png|svg|jpg|gif|md)$/,
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
          test: /\.tsx?$/,
          exclude: /(node_modules|bower_components)/,
          use: [
            {
              loader: 'awesome-typescript-loader',
              options: {
                configFileName: tsConfigPath,
                useBabel: true,
                babelOptions: {
                  babelrc: false,
                  presets: [
                    '@babel/preset-react',
                    ['@emotion/babel-preset-css-prop', { autoLabel: true }],
                  ],
                  plugins: [
                    '@babel/plugin-proposal-optional-chaining',
                    '@babel/plugin-proposal-object-rest-spread',
                  ],
                },
              },
            },
          ],
        },
      ],
    },
  };
};
