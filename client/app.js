import express from "express";
import NextJS from "next";
import { PORT } from "./config";

const dev = process.env.NODE_ENV !== "production";
const app = NextJS({
  dev
});
const handle = app.getRequestHandler();

app.prepare().then(async () => {
  const server = express();
  server.use("*", (req, res, next) => {
    next();
  });
  server.get("*", (req, res) => {
    return handle(req, res);
  });
  server.listen(PORT, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
