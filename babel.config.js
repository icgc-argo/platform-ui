// this is for jest-babel integration

module.exports = {
  presets: [['@babel/preset-env', { targets: { node: 'current' } }], 'next/babel'],
};
