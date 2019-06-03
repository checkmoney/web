import { Injectable } from '@nestjs/common'
import { Option } from 'tsoption'
import { timeout } from 'promise-timeout'

import { Currency } from '$shared/enum/Currency'
import { Configuration } from '$back/config/Configuration'
import { ExchangeRateApi } from './ExchangeRateApi'
import { MannyApiClient } from './specific/MannyApiClient'
import { ExchangeRatesApiClient } from './specific/ExchangeRatesApiClient'

@Injectable()
export class ApiClientUnity implements ExchangeRateApi {
  private readonly clients: ExchangeRateApi[]

  public constructor(config: Configuration) {
    this.clients = [new ExchangeRatesApiClient(), new MannyApiClient(config)]
  }

  public async getExchangeRate(
    from: Currency,
    to: Currency,
  ): Promise<Option<number>> {
    for (const client of this.clients) {
      // await in loop because we want try sequentially get rate
      // eslint-disable-next-line no-await-in-loop
      const rate = await this.fetchWithTimeout(client.getExchangeRate(from, to))

      if (rate.nonEmpty()) {
        return rate
      }
    }

    return Option.of(null)
  }

  public async getHistoryExchangeRate(
    from: Currency,
    to: Currency,
    when: Date,
  ): Promise<Option<number>> {
    for (const client of this.clients) {
      // await in loop because we want try sequentially get rate
      // eslint-disable-next-line no-await-in-loop
      const rate = await this.fetchWithTimeout(
        client.getHistoryExchangeRate(from, to, when),
      )

      if (rate.nonEmpty()) {
        return rate
      }
    }

    return Option.of(null)
  }

  private fetchWithTimeout(
    promise: Promise<Option<number>>,
  ): Promise<Option<number>> {
    return timeout(promise, 1000).catch(() => Option.of(null))
  }
}
