import { Option } from 'tsoption'

import { Currency } from '&shared/enum/Currency'

export abstract class ExchangeRateApi {
  public abstract getExchangeRate(
    from: Currency,
    to: Currency,
  ): Promise<Option<number>>

  public abstract getHistoryExchangeRate(
    from: Currency,
    to: Currency,
    when: Date,
  ): Promise<Option<number>>
}
