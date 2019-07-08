import express from 'express';
import NextJS from 'next';
import bodyParser from 'body-parser';

import config from './package.json';
import { PORT } from './global/config';

const { version } = config;

const dev = process.env.NODE_ENV !== 'production';
const Next = NextJS({
  dev,
});
const handle = Next.getRequestHandler();

const server = express();
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(express.static('static'));
server.use('/status', (req, res) => {
  res.json(version);
});

Next.prepare().then(async () => {
  server.get('*', (req, res) => handle(req, res));
  server.listen(PORT, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
