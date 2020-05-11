require('reflect-metadata');
const args = require('args-parser')(process.argv);
const cookieParser = require('cookie-parser');
const express = require('express');
const next = require('next');

const routes = require('./routes');

const FALLBACK_PORT = 3001;
const PORT = args.p || FALLBACK_PORT;

const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev });
const handler = routes.getRequestHandler(app);

app.prepare().then(() => {
  const server = express();
  server.use(cookieParser());

  server.get('*', (req, res) => handler(req, res));

  return server.listen(PORT);
});
