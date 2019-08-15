import { INestApplication } from '@nestjs/common';
import { TelegramBot } from 'nest-telegram';

import { Configuration } from '&back/config/Configuration';

export const setupTelegram = (app: INestApplication) => {
  const bot = app.get(TelegramBot);
  const config = app.get(Configuration);

  const isMirror = config.getBooleanOrElse('IS_MIRROR', false);

  if (config.isProd() && !isMirror) {
    app.use(
      bot.getMiddleware(config.getStringOrElse('APP_SECRET', 'secret-path')),
    );
  }
};
