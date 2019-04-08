const Fastify = require('fastify')
const server = Fastify()

server.register(require('fastify-http-proxy'), {
  upstream: process.env.BACK_URL || 'https://api.checkmoney.space',
})

server.listen(3000)
