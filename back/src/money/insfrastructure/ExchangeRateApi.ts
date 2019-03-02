import { Injectable } from '@nestjs/common'
import Axios from 'axios'

import { Configuration } from '@back/config/Configuration'
import { Currency } from '@shared/enum/Currency'
import { format, differenceInDays, subDays } from 'date-fns'

interface PromiseCacheMap {
  [key: string]: Promise<number>
}

const API_URL = 'https://free.currencyconverterapi.com'

@Injectable()
export class ExchangeRateApi {
  private readonly apiKey: string

  private readonly simplePromises: PromiseCacheMap = {}
  private readonly historyPromises: PromiseCacheMap = {}

  public constructor(config: Configuration) {
    this.apiKey = config.getStringOrElse('MANNY_API_KEY', '')
  }

  public getExchangeRate(from: Currency, to: Currency): Promise<number> {
    const query = `${from}_${to}`

    if (!this.simplePromises[query]) {
      this.simplePromises[query] = Axios.get(
        `${API_URL}/api/v6/convert?q=${query}&apiKey=${this.apiKey}`,
      )
        .then(response => response.data)
        .then(data => data.results)
        .then(results => results[query])
        .then(rate => parseFloat(rate.val))
    }

    return this.simplePromises[query]
  }

  public getHistoryExchangeRate(
    from: Currency,
    to: Currency,
    when: Date,
  ): Promise<number> {
    const MAX_RATE_AGE_IN_DAYS = 360

    const dateInvalidForApi =
      differenceInDays(when, new Date()) >= MAX_RATE_AGE_IN_DAYS
    const correctDate = dateInvalidForApi
      ? subDays(new Date(), MAX_RATE_AGE_IN_DAYS)
      : when

    const dateQuery = format(correctDate, 'YYYY-MM-DD')
    const currencyQuery = `${from}_${to}`

    const fullQuery = `${currencyQuery}_${dateQuery}`

    if (!this.historyPromises[fullQuery]) {
      this.historyPromises[fullQuery] = Axios.get(
        `${API_URL}/api/v6/convert?q=${currencyQuery}&apiKey=${
          this.apiKey
        }&date=${dateQuery}`,
      )
        .then(response => response.data)
        .then(data => data.results)
        .then(results => results[currencyQuery])
        .then(dateData => dateData[dateQuery])
        .then(rate => parseFloat(rate.val))
    }

    return this.historyPromises[fullQuery]
  }
}
