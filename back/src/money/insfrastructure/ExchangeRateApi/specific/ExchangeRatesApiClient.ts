import Axios from 'axios'
import { Option } from 'tsoption'
import { format, differenceInDays } from 'date-fns'

import { Configuration } from '&back/config/Configuration'
import { Currency } from '&shared/enum/Currency'
import { ExchangeRateApi } from '../ExchangeRateApi'

interface PromiseCacheMap {
  [key: string]: Promise<Option<number>>
}

interface Query {
  from: string
  to: string
  date?: string
}

export class ExchangeRatesApiClient implements ExchangeRateApi {
  private readonly simplePromises: PromiseCacheMap = {}
  private readonly historyPromises: PromiseCacheMap = {}

  public getExchangeRate(
    from: Currency,
    to: Currency,
  ): Promise<Option<number>> {
    const query = `${from}_${to}`

    if (!this.simplePromises[query]) {
      this.simplePromises[query] = this.request({ from, to })
    }

    return this.simplePromises[query]
  }

  public getHistoryExchangeRate(
    from: Currency,
    to: Currency,
    when: Date,
  ): Promise<Option<number>> {
    const date = format(when, 'YYYY-MM-DD')
    const query = `${from}_${to}`

    const fullQuery = `${query}_${date}`

    if (!this.historyPromises[fullQuery]) {
      this.historyPromises[fullQuery] = this.request({
        from,
        to,
        date,
      })
    }

    return this.historyPromises[fullQuery]
  }

  private async request({ from, to, date }: Query): Promise<Option<number>> {
    const API_URL = 'https://api.exchangeratesapi.io'

    const dateParam = !!date ? `${date}` : 'latest'

    const requestUrl = `${API_URL}/${dateParam}?base=${from}&symbols=${to}`

    return Axios.get(requestUrl)
      .then(response => response.data)
      .then(data => data.rates)
      .then(rates => rates[to])
      .then(rate => parseFloat(rate))
      .then(rate => Option.of(rate))
      .catch(() => Option.of(null))
  }
}
