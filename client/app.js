import express from "express";
import NextJS from "next";
import fetch from "isomorphic-fetch";
import urlJoin from "url-join";

import { PORT, API_ROOT } from "./config";

const dev = process.env.NODE_ENV !== "production";
const app = NextJS({
  dev
});
const handle = app.getRequestHandler();

app.prepare().then(async () => {
  const server = express();
  server.get("*", (req, res) => {
    req.runQuery = ({ query, variables }) =>
      fetch(urlJoin(API_ROOT, "graphql"), {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          query,
          variables
        })
      });
    return handle(req, res);
  });
  server.listen(PORT, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
