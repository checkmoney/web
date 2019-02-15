import { Injectable } from '@nestjs/common'
import Axios from 'axios'

import { Configuration } from '@back/config/Configuration'
import { Currency } from '@shared/enum/Currency'

interface PromiseCacheMap {
  [key: string]: Promise<number>
}

@Injectable()
export class ExchangeRateApi {
  private readonly apiKey: string

  private readonly promises: PromiseCacheMap = {}

  public constructor(config: Configuration) {
    this.apiKey = config.getStringOrElse('MANNY_API_KEY', '')
  }

  public getExchangeRate(from: Currency, to: Currency): Promise<number> {
    const API_URL = 'https://free.currencyconverterapi.com'

    const query = this.createQuery(from, to)

    if (!this.promises[query]) {
      this.promises[query] = Axios.get(
        `${API_URL}/api/v6/convert?q=${query}&apiKey=${this.apiKey}`,
      )
        .then(response => response.data)
        .then(data => data.results)
        .then(results => results[query])
        .then(rate => parseFloat(rate.val))
    }

    return this.promises[query]
  }

  private createQuery(from: Currency, to: Currency): string {
    return `${from}_${to}`
  }
}
