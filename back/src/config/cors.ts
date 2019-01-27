import { INestApplication } from '@nestjs/common'
import * as cors from 'cors'

const corsMiddleware = () => {
  const corsOptions = {
    origin: '*',
    credentials: true,
    allowHeaders: [
      'DNT',
      'User-Agent',
      'X-Requested-With',
      'If-Modified-Since',
      'Cache-Control',
      'Content-Type',
      'Range',
      'Authorization',
      'Cookie',
    ],
    methods: ['GET', 'POST', 'OPTIONS'],
  }

  return cors(corsOptions)
}

export default (app: INestApplication) => {
  app.use(corsMiddleware())
}