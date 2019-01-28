import { ExceptionFilter, Provider, Type } from '@nestjs/common'
import { APP_FILTER } from '@nestjs/core'

export default class FilterProviderFactory {
  public static provider(filter: Type<ExceptionFilter>): Provider {
    return {
      provide: APP_FILTER,
      useClass: filter,
    }
  }
}
