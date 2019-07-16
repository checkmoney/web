import { Injectable } from '@nestjs/common'
import { differenceInDays, startOfHour, startOfDay } from 'date-fns'

import { EntitySaver } from '&back/db/EntitySaver'
import { Currency } from '&shared/enum/Currency'

import { ExchangeRate } from '../domain/ExchangeRate.entity'
import { ExchangeRateRepository } from '../domain/ExchangeRateRepository'
import { ExchangeRateApi } from '../insfrastructure/ExchangeRateApi/ExchangeRateApi'
import { Option } from 'tsoption'
import { ConversationFailedException } from './exception/ConversationFailedException'

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

    const normalizedDate = startOfDay(when)
    const normalizedNowDate = startOfDay(new Date())

    const rate = await this.getExistRate(from, to, normalizedDate)
      .catch(() => this.getExistRateFromReverse(from, to, when))
      .catch(() => this.getActualRate(from, to, normalizedDate))
      .catch(() => this.getClosestExistRate(from, to, normalizedDate))
      .catch(() => this.getActualRate(from, to, normalizedNowDate))
      .catch(() => this.getLastExistRate(from, to))

    return Math.round(amount * rate)
  }

  private async getActualRate(
    from: Currency,
    to: Currency,
    when: Date,
  ): Promise<number> {
    const MIN_DAY_FOR_HISTORY_TRANSACTION = 2

    const rateIsOld =
      Math.abs(differenceInDays(when, new Date())) >
      MIN_DAY_FOR_HISTORY_TRANSACTION

    const actualRate = await (rateIsOld
      ? this.exchangeRateApi.getHistoryExchangeRate(from, to, when)
      : this.exchangeRateApi.getExchangeRate(from, to))

    if (actualRate.nonEmpty()) {
      const newRate = new ExchangeRate(from, to, when, actualRate.get())

      await this.entitySaver.save(newRate).catch(() => {
        // Okay, rate not saved
      })

      return newRate.rate
    }

    throw new ConversationFailedException(from, to, when)
  }

  private async getExistRate(
    from: Currency,
    to: Currency,
    when: Date,
  ): Promise<number> {
    return this.getOrThrow(
      this.exchangeRateRepo.find(from, to, when),
      new ConversationFailedException(from, to, when),
    )
  }

  private async getExistRateFromReverse(
    from: Currency,
    to: Currency,
    when: Date,
  ): Promise<number> {
    const revert = ({ to, from, collectAt, rate }: ExchangeRate) =>
      new ExchangeRate(to, from, collectAt, 1 / rate)

    return this.getOrThrow(
      this.exchangeRateRepo.find(to, from, when).then(rate => rate.map(revert)),
      new ConversationFailedException(from, to, when),
    )
  }

  private async getClosestExistRate(
    from: Currency,
    to: Currency,
    when: Date,
  ): Promise<number> {
    return this.getOrThrow(
      this.exchangeRateRepo.findClosest(from, to, when),
      new ConversationFailedException(from, to, when),
    )
  }

  private async getLastExistRate(
    from: Currency,
    to: Currency,
  ): Promise<number> {
    return this.getOrThrow(
      this.exchangeRateRepo.findLast(from, to),
      new ConversationFailedException(from, to, new Date()),
    )
  }

  private async getOrThrow(
    promiseRate: Promise<Option<ExchangeRate>>,
    error: ConversationFailedException,
  ): Promise<number> {
    const rate = await promiseRate

    if (rate.nonEmpty()) {
      return rate.get().rate
    }

    throw error
  }
}
