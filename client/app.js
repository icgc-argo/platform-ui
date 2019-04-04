import express from "express";
import NextJS from "next";
import bodyParser from "body-parser";

import { PORT } from "./config";

const dev = process.env.NODE_ENV !== "production";
const app = NextJS({
  dev
});
const handle = app.getRequestHandler();

app.prepare().then(async () => {
  const server = express();
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(bodyParser.json());

  server.get("/", (req, res) => {
    const queryParams = { id: req.query.id };
    app.render(req, res, "/", queryParams);
  });
  server.get("*", (req, res) => handle(req, res));
  server.listen(PORT, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
