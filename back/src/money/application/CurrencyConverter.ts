import { Injectable } from '@nestjs/common'
import { addDays } from 'date-fns'

import { EntitySaver } from '@back/db/EntitySaver'
import { Currency } from '@shared/enum/Currency'

import { ExchangeRate } from '../domain/ExchangeRate.entity'
import { ExchangeRateRepository } from '../domain/ExchangeRateRepository'
import { ExchangeRateApi } from '../insfrastructure/ExchangeRateApi'

@Injectable()
export class CurrencyConverter {
  public constructor(
    private readonly exchangeRateApi: ExchangeRateApi,
    private readonly exchangeRateRepo: ExchangeRateRepository,
    private readonly entitySaver: EntitySaver,
  ) {}

  public async convert(
    from: Currency,
    to: Currency,
    amount: number,
  ): Promise<number> {
    if (from === to) {
      return amount
    }

    const rate = await this.getExchangeRate(from, to)

    return Math.round(amount * rate)
  }

  private async getExchangeRate(from: Currency, to: Currency): Promise<number> {
    const existRate = await this.exchangeRateRepo.find(from, to)

    const overdue = existRate.map(rate => rate.due < new Date()).getOrElse(true)

    if (existRate.nonEmpty() && !overdue) {
      return existRate.get().rate
    }

    const actualRate = await this.exchangeRateApi.getExchangeRate(from, to)

    const newRate = new ExchangeRate(
      from,
      to,
      addDays(new Date(), 1),
      actualRate,
    )

    await this.entitySaver.save(newRate)

    return newRate.rate
  }
}
