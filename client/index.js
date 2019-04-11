#!/usr/bin/env node
require("babel-polyfill");
// require("babel-plugin-graphql-tag");
// require("babel-plugin-import-graphql");
require("dotenv").config();
require("@babel/register")({
  presets: ["@babel/preset-env"],
  plugins: [
    // "graphql-tag",
    // "import-graphql",
    "@babel/plugin-proposal-optional-chaining",
    "@babel/plugin-proposal-object-rest-spread"
  ]
});

require("./app");
