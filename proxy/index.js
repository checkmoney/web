const httpProxy = require('http-proxy')

const UPSTREAM = process.env.BACK_URL || 'https://api.checkmoney.space'

httpProxy
  .createProxyServer({
    changeOrigin: true,
    target: UPSTREAM,
    followRedirects: true,
  })
  .on('error', e => console.log(JSON.stringify(e, null, ' ')))
  .listen(8000)
