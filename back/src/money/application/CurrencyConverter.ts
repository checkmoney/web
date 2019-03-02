import { Injectable } from '@nestjs/common'
import { differenceInDays, startOfHour } from 'date-fns'

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
    when: Date,
  ): Promise<number> {
    if (from === to) {
      return amount
    }

    const normalizedDate = startOfHour(when)

    const rate = await this.getExchangeRate(from, to, normalizedDate).catch(
      async e => {
        // if correct rate getting failed, we can return the closest available rate
        const closestRate = await this.exchangeRateRepo.findClosest(
          from,
          to,
          normalizedDate,
        )

        if (closestRate.nonEmpty()) {
          return closestRate.get().rate
        }

        throw e
      },
    )

    return Math.round(amount * rate)
  }

  private async getExchangeRate(
    from: Currency,
    to: Currency,
    when: Date,
  ): Promise<number> {
    const existRate = await this.exchangeRateRepo.find(from, to, when)

    if (existRate.nonEmpty()) {
      return existRate.get().rate
    }

    const actualRate = await this.fetchExchangeRate(from, to, when)

    const newRate = new ExchangeRate(from, to, when, actualRate)

    await this.entitySaver.save(newRate).catch(() => {
      // Okay, rate not saved
    })

    return newRate.rate
  }

  private async fetchExchangeRate(
    from: Currency,
    to: Currency,
    when: Date,
  ): Promise<number> {
    const MIN_DAY_FOR_HISTORY_TRANSACTION = 2

    const rateIsOld =
      differenceInDays(when, new Date()) > MIN_DAY_FOR_HISTORY_TRANSACTION

    if (rateIsOld) {
      return this.exchangeRateApi.getHistoryExchangeRate(from, to, when)
    }

    return this.exchangeRateApi.getExchangeRate(from, to)
  }
}
