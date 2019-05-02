/**
 *
 * Browserstack API helpers
 *
 */

require("dotenv").config();
const fetch = require("isomorphic-fetch");

const BS_USER = process.env.BROWSERSTACK_USER;
const BS_KEY = process.env.BROWSERSTACK_ACCESS_KEY;
const BS_API_ROOT = process.env.BROWSERSTACK_API_ROOT;

const updateStatus = (browser, status, reason) => {
  const sessionId = browser.sessionId;

  const headers = new Headers();
  const authString = Buffer.from(`${BS_USER}:${BS_KEY}`).toString("base64");
  headers.set("Authorization", "Basic " + authString);
  headers.set("Content-Type", "application/json");

  const params = {
    status: "error" // Completed, Error or Timeout.
    //  reason: "api update status call ran successfuly"
  };

  fetch(
    `${BS_API_ROOT}/sessions/bff41777b98c313a4a63f1993205ad96f9efa915.json`,
    {
      method: "PUT",
      headers: headers,
      auth: `${BS_USER}:${BS_KEY}`,
      body: JSON.stringify(params)
    }
  )
    .then(resp => resp.json())
    .then(console.log)
    .catch(err => console.log("err", err));
};

module.exports = {
  updateStatus
};
