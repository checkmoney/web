const nextRoutes = require('next-routes')

module.exports = nextRoutes()
  .add({ pattern: '/', page: 'index' })
  .add({ pattern: '/forbidden', page: 'forbidden' })
  .add({ pattern: '/hello', page: 'internal/hello' })
  .add({ pattern: '/app', page: 'internal/app' })
  .add({ pattern: '/app/stats', page: 'internal/stats' })
