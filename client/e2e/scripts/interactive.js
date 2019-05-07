#!/usr/bin/env node

const inquirer = require("inquirer");
const chalk = require("chalk");
const browserstackEnvs = require("../env/browserstack");
const devEnvs = require("../env/dev");
const shell = require("shelljs");

const log = console.log;
const info = chalk.magenta.bold;

const TEST_TYPE = {
  DEV: "dev",
  BROWERSTACK_LOCAL: "browserstack local"
};

const askEnv = async type =>
  inquirer.prompt([
    {
      name: "env",
      type: "list",
      message: "Which test environment do you want to use?",
      choices: Object.keys(type)
    }
  ]);

const askType = async () =>
  inquirer.prompt([
    {
      name: "type",
      type: "list",
      message: "Which type of test do you want to run?",
      choices: [TEST_TYPE.DEV, TEST_TYPE.BROWERSTACK_LOCAL]
    }
  ]);

const run = async () => {
  log(info("E2E Testing"));
  const { type } = await askType();

  if (type === TEST_TYPE.DEV) {
    const { env } = await askEnv(devEnvs);
    log(info(`Running ${type} test in ${env} environment`));
    shell.exec(`nightwatch -c e2e/conf/dev.js -e ${env}`);
  } else if (type === TEST_TYPE.BROWERSTACK_LOCAL) {
    const { env } = await askEnv(browserstackEnvs);
    log(info(`Running ${type} test in ${env} environment`));
    shell.exec(`e2e/scripts/local.runner.js -c e2e/conf/local.js -e ${env}`);
  }
};

run();
