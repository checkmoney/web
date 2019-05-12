const next = require('next')
const express = require('express')
const cookieParser = require('cookie-parser')
const args = require('args-parser')(process.argv)
const nextI18NextMiddleware = require('next-i18next/middleware')
const routes = require('./routes')
const i18n = require('./i18n')

const FALLBACK_PORT = 3001
const PORT = args.p || FALLBACK_PORT

const dev = process.env.NODE_ENV !== 'production'

const app = next({ dev })
const handler = routes.getRequestHandler(app)

app.prepare().then(() => {
  const server = express()
  server.use(cookieParser())
  server.use(nextI18NextMiddleware(i18n))

  server.get('*', (req, res) => handler(req, res))

  return server.listen(PORT)
})
