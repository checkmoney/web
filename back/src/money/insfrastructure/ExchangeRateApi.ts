import { Injectable } from '@nestjs/common'
import Axios from 'axios'

import { Configuration } from '@back/config/Configuration'
import { Currency } from '@shared/enum/Currency'
import { format, differenceInDays, subDays } from 'date-fns'

interface PromiseCacheMap {
  [key: string]: Promise<number>
}

interface Query {
  query: string
  date?: string
}

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
      this.simplePromises[query] = this.request({ query })
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
    const date = format(when, 'YYYY-MM-DD')
    const query = `${from}_${to}`

    const fullQuery = `${query}_${date}`

    if (!this.historyPromises[fullQuery]) {
      this.historyPromises[fullQuery] = this.request({
        query,
        date,
      })
        .then(results => results[query])
        .then(dateData => dateData[date])
        .then(rate => parseFloat(rate.val))
    }

    return this.historyPromises[fullQuery]
  }

  private async request({ query, date }: Query) {
    const API_URL = 'https://free.currencyconverterapi.com/api/v6/convert'

    const dateParam = !!date ? `&date=${date}` : ''

    const requestUrl = `${API_URL}?q=${query}&apiKey=${this.apiKey}${dateParam}`

    return Axios.get(requestUrl)
      .then(response => response.data)
      .then(data => data.results)
  }
}
