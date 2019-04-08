const httpProxy = require('http-proxy')

const UPSTREAM = process.env.BACK_URL || 'https://api.checkmoney.space'

httpProxy
  .createProxyServer({
    changeOrigin: true,
    target: UPSTREAM,
    followRedirects: true,
  })
  .listen(8000)
