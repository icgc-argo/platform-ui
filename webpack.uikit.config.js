const path = require('path');
const glob = require('glob');

const sourceDir = path.resolve(__dirname, './uikit/dist/**/*.*');
const outPath = path.resolve(__dirname, './uikit/dist/dist');
const tsconfigPath = path.resolve(__dirname, './tsconfig.uikit.json');

const getFiles = () =>
  new Promise((resolve, reject) =>
    glob(sourceDir, (err, files) => {
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
      [filePath]: filePath,
    }),
    {},
  );
  return {
    entry: entries,
    output: {
      path: outPath,
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          options: { configFile: tsconfigPath },
        },
      ],
    },
  };
};
