const bs = require('../../helpers');
const { runGqlQuery } = require('../../helpers');

module.exports = {
  desiredCapabilities: {
    name: 'Programs list page',
  },

  'Programs list page exists': browser => {
    browser
      .url('http://localhost:8080/programs')
      .waitForElementVisible('body')
      .end();
  },

  'Programs list page renders the right programs to table': browser => {
    const programsPage = browser.url('http://localhost:8080/programs');
    runGqlQuery({
      query: `
        {
          programs {
            name
            shortName
            cancerTypes
          }
        }
      `,
    }).then(({ data: { programs } }) => {
      programsPage.waitForElementVisible('#programs-list-container');
      programsPage.expect
        .elements(`#programs-list-container .rt-td:nth-child(1)`)
        .count.to.equal(programs.length);
      programs.forEach((program, i) => {
        programsPage.assert.containsText(
          `#programs-list-container .rt-tr-group:nth-child(${i + 1}) .rt-td:nth-child(1)`,
          program.name,
        );
        programsPage.assert.containsText(
          `#programs-list-container .rt-tr-group:nth-child(${i + 1}) .rt-td:nth-child(2)`,
          program.shortName,
        );
        program.cancerTypes.forEach(cancerType => {
          programsPage.assert.containsText(
            `#programs-list-container .rt-tr-group:nth-child(${i + 1}) .rt-td:nth-child(3)`,
            cancerType,
          );
        });
      });
    });
  },

  afterEach: (browser, done) => {
    const result = browser.currentTest.results;
    // manual failure check for browserstack API call
    if (result.failed > 0) {
      const err = result.lastError.message;
      bs.updateStatus(browser, 'failed', err);
    }
    done();
  },
};
