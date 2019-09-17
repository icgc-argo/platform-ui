/**
 *
 * Browserstack API helpers
 *
 */

require('dotenv').config();
const fetch = require('isomorphic-fetch');
const urlJoin = require('url-join');

const BS_USER = process.env.BROWSERSTACK_USER;
const BS_KEY = process.env.BROWSERSTACK_ACCESS_KEY;
const BS_API_ROOT = process.env.BROWSERSTACK_API_ROOT;

const updateStatus = (browser, status, reason) => {
  const sessionId = browser.sessionId;

  const headers = new Headers();
  const authString = Buffer.from(`${BS_USER}:${BS_KEY}`).toString('base64');
  headers.set('Authorization', 'Basic ' + authString);
  headers.set('Content-Type', 'application/json');

  const params = {
    status: status, // Completed, Error or Timeout.
    reason: reason,
  };

  fetch(`${BS_API_ROOT}/sessions/${sessionId}.json`, {
    method: 'PUT',
    headers: headers,
    auth: `${BS_USER}:${BS_KEY}`,
    body: JSON.stringify(params),
  })
    .then(resp => resp.json())
    .then(console.log)
    .catch(err => console.log('err', err));
};

const runGqlQuery = ({ query, variables }) =>
  fetch(urlJoin(process.env.GATEWAY_API_ROOT, 'graphql'), {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  }).then(res => res.json());

module.exports = {
  runGqlQuery,
  updateStatus,
};
