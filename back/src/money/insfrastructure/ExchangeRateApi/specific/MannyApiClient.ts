import Axios from 'axios';
import { Option } from 'tsoption';
import { format, differenceInDays } from 'date-fns';

import { Configuration } from '&back/config/Configuration';
import { Currency } from '&shared/enum/Currency';
import { ExchangeRateApi } from '../ExchangeRateApi';

interface PromiseCacheMap {
  [key: string]: Promise<Option<number>>;
}

interface Query {
  query: string;
  date?: string;
}

export class MannyApiClient implements ExchangeRateApi {
  private readonly apiKey: string;

  private readonly simplePromises: PromiseCacheMap = {};
  private readonly historyPromises: PromiseCacheMap = {};

  public constructor(config: Configuration) {
    this.apiKey = config.getStringOrElse('MANNY_API_KEY', '');
  }

  public getExchangeRate(
    from: Currency,
    to: Currency,
  ): Promise<Option<number>> {
    const query = `${from}_${to}`;

    if (!this.simplePromises[query]) {
      this.simplePromises[query] = this.request({ query });
    }

    return this.simplePromises[query];
  }

  public getHistoryExchangeRate(
    from: Currency,
    to: Currency,
    when: Date,
  ): Promise<Option<number>> {
    const MAX_RATE_AGE_IN_DAYS = 360;

    // Api not respond for date older than MAX_RATE_AGE_IN_DAYS
    // Blank-shot-requests not successful, but spend the limit
    if (Math.abs(differenceInDays(when, new Date())) > MAX_RATE_AGE_IN_DAYS) {
      return Promise.resolve(Option.of(null));
    }

    const date = format(when, 'YYYY-MM-DD');
    const query = `${from}_${to}`;

    const fullQuery = `${query}_${date}`;

    if (!this.historyPromises[fullQuery]) {
      this.historyPromises[fullQuery] = this.request(
        {
          query,
          date,
        },
        dateData => dateData[date],
      );
    }

    return this.historyPromises[fullQuery];
  }

  private async request(
    { query, date }: Query,
    mapper: (results: any) => any = v => v,
  ): Promise<Option<number>> {
    const API_URL = 'https://free.currencyconverterapi.com/api/v6/convert';

    const dateParam = !!date ? `&date=${date}` : '';

    const requestUrl = `${API_URL}?q=${query}&apiKey=${this.apiKey}${dateParam}`;

    return Axios.get(requestUrl)
      .then(response => response.data)
      .then(data => data.results)
      .then(results => results[query])
      .then(mapper)
      .then(rate => parseFloat(rate.val))
      .then(rate => Option.of(rate))
      .catch(() => Option.of(null));
  }
}
