#!/usr/bin/env node

require('dotenv').config();

const fetch = require('isomorphic-fetch');
const Nightwatch = require('nightwatch');
const browserstack = require('browserstack-local');

// Code to start browserstack local before start of test
let bs_local;
const onBsStart = function(error) {
  if (error) {
    throw error;
  }

  console.log('Connected. Now testing...');
  Nightwatch.cli(function(argv) {
    Nightwatch.CliRunner(argv)
      .setup(null, function() {
        // Code to stop browserstack local after end of parallel test
        bs_local.stop(function() {});
      })
      .runTests(function() {
        // Code to stop browserstack local after end of single test
        bs_local.stop(function() {});
      });
  });
};

try {
  process.mainModule.filename = './node_modules/.bin/nightwatch';

  console.log('Connecting local');
  Nightwatch.bs_local = bs_local = new browserstack.Local();
  fetch('http://localhost:45691') // dirty test to check if there's already a local client
    .then(() => {
      bs_local.start(
        { key: process.env.BROWSERSTACK_ACCESS_KEY, localIdentifier: String(Math.random()) },
        onBsStart,
      );
    })
    .catch(err => {
      bs_local.start({ key: process.env.BROWSERSTACK_ACCESS_KEY }, onBsStart);
    });
} catch (ex) {
  console.log('There was an error while starting the test runner:\n\n');
  process.stderr.write(ex.stack + '\n');
  process.exit(2);
}
