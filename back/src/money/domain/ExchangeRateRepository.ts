import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Option } from 'tsoption'
import { Repository } from 'typeorm'

import { Currency } from '@shared/enum/Currency'

import { ExchangeRate } from './ExchangeRate.entity'

@Injectable()
class ExchangeRateRepo {
  public constructor(
    @InjectRepository(ExchangeRate)
    private readonly exchageRateRepo: Repository<ExchangeRate>,
  ) {}

  public async find(
    from: Currency,
    to: Currency,
  ): Promise<Option<ExchangeRate>> {
    const rate = await this.exchageRateRepo
      .createQueryBuilder('rate')
      .where('rate.from = :from')
      .andWhere('rate.to = :to')
      .setParameters({ from, to })
      .getOne()

    return Option.of(rate)
  }
}

export const ExchangeRateRepository = ExchangeRateRepo
export type ExchangeRateRepository = ExchangeRateRepo
