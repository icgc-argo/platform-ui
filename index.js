#!/usr/bin/env node
require('babel-polyfill');
// require("babel-plugin-graphql-tag");
// require("babel-plugin-import-graphql");
require('dotenv').config();
require('@babel/register')({
  presets: ['@babel/env'],
  plugins: [
    // "graphql-tag",
    // "import-graphql",
  ],
});

require('./app');
