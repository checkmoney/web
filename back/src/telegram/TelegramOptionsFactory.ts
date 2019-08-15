import { Injectable } from '@nestjs/common';
import {
  TelegramModuleOptionsFactory,
  TelegramModuleOptions,
} from 'nest-telegram';

import { Configuration } from '&back/config/Configuration';

@Injectable()
export class TelegramOptionsFactory implements TelegramModuleOptionsFactory {
  private readonly token: string;
  private readonly sitePublicUrl?: string = undefined;

  public constructor(config: Configuration) {
    this.token = config.getStringOrElse('TELEGRAM_BOT_TOKEN', 'Secret');

    if (config.isProd()) {
      this.sitePublicUrl = config.getStringOrElse(
        'API_PUBLIC_URL',
        'https://api.checkmoney.space',
      );
    }
  }

  public createOptions(): TelegramModuleOptions {
    return {
      token: this.token,
      sitePublicUrl: this.sitePublicUrl,
    };
  }
}
