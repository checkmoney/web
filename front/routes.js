const nextRoutes = require('next-routes')

module.exports = nextRoutes()
  .add({ pattern: '/', page: 'index' })
  .add({ pattern: '/forbidden', page: 'forbidden' })
  .add({ pattern: '/hello', page: 'internal/hello' })
  .add({ pattern: '/app', page: 'internal/app' })
  .add({ pattern: '/app/stats', page: 'internal/stats' })
  .add({
    pattern: '/app/stats/categories/:group?',
    page: 'internal/categories',
  })
  .add({ pattern: '/app/history', page: 'internal/history' })
  .add({ pattern: '/app/profile', page: 'internal/profile' })
  .add({ pattern: '/manager', page: 'internal/manager' })
