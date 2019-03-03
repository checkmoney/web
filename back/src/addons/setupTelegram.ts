import { TelegramBot } from 'nest-telegram'
import { INestApplication } from '@nestjs/common'

import { Configuration } from '@back/config/Configuration'

export const setupTelegram = (app: INestApplication) => {
  const bot = app.get(TelegramBot)
  const config = app.get(Configuration)

  if (config.isProd()) {
    app.use(
      bot.getMiddleware(config.getStringOrElse('APP_SECRET', 'secret-path')),
    )
  }
}
