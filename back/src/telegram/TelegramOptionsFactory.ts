import { Injectable } from '@nestjs/common'
import {
  TelegramModuleOptionsFactory,
  TelegramModuleOptions,
} from 'nest-telegram'
import { Configuration } from '@back/config/Configuration'

@Injectable()
export class TelegramOptionsFactory implements TelegramModuleOptionsFactory {
  private readonly token: string

  public constructor(config: Configuration) {
    this.token = config.getStringOrElse('TELEGRAM_BOT_TOKEN', 'Secret')
  }

  public createOptions(): TelegramModuleOptions {
    return {
      token: this.token,
    }
  }
}
