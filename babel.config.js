module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript',
    '@babel/preset-react',
    [
      'next/babel',
      {
        'transform-runtime': {
          useESModules: false,
        },
      },
    ],
    ['@emotion/babel-preset-css-prop', { autoLabel: true }],
  ],
  plugins: [
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-object-rest-spread',
  ],
  env: {
    test: {
      presets: ['@babel/preset-env', '@babel/react', 'next/babel'],
    },
    development: {
      presets: ['next/babel'],
    },
  },
};
