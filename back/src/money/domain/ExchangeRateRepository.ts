import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { startOfDay, endOfDay, differenceInMilliseconds } from 'date-fns';
import { Option } from 'tsoption';
import { Repository } from 'typeorm';

import { Currency } from '&shared/enum/Currency';

import { ExchangeRate } from './ExchangeRate.entity';

@Injectable()
class ExchangeRateRepo {
  public constructor(
    @InjectRepository(ExchangeRate)
    private readonly exchageRateRepo: Repository<ExchangeRate>,
  ) {}

  public async find(
    from: Currency,
    to: Currency,
    forWhen: Date = new Date(),
  ): Promise<Option<ExchangeRate>> {
    const startDate = startOfDay(forWhen);
    const endDate = endOfDay(forWhen);

    return this.createFromToQueryBuilder('rate')
      .andWhere('rate.collectAt >= :startDate')
      .andWhere('rate.collectAt <= :endDate')
      .setParameters({ from, to, startDate, endDate })
      .getOne()
      .then(this.toOption);
  }

  public async findLast(
    from: Currency,
    to: Currency,
  ): Promise<Option<ExchangeRate>> {
    return this.createFromToQueryBuilder('rate')
      .orderBy('rate.collectAt', 'DESC')
      .setParameters({ from, to })
      .getOne()
      .then(this.toOption);
  }

  public async findClosest(
    from: Currency,
    to: Currency,
    forWhen: Date = new Date(),
  ): Promise<Option<ExchangeRate>> {
    const findBefore = () =>
      this.createFromToQueryBuilder('rate')
        .andWhere('rate.collectAt <= :forWhen')
        .orderBy('rate.collectAt', 'DESC')
        .setParameters({ from, to, forWhen })
        .getOne()
        .then(this.toOption);

    const findAfter = () =>
      this.createFromToQueryBuilder('rate')
        .andWhere('rate.collectAt >= :forWhen')
        .orderBy('rate.collectAt', 'ASC')
        .setParameters({ from, to, forWhen })
        .getOne()
        .then(this.toOption);

    const [before, after] = await Promise.all([findBefore(), findAfter()]);

    const rateToDiff = (rate: Option<ExchangeRate>) =>
      rate
        .map(r => differenceInMilliseconds(r.collectAt, forWhen))
        .map(Math.abs)
        .getOrElse(Infinity);

    const beforeDiff = rateToDiff(before);
    const afterDiff = rateToDiff(after);

    return afterDiff < beforeDiff ? after : before;
  }

  private createFromToQueryBuilder(alias: string) {
    return this.exchageRateRepo
      .createQueryBuilder(alias)
      .where(`${alias}.from = :from`)
      .andWhere(`${alias}.to = :to`);
  }

  private toOption(rate: ExchangeRate): Option<ExchangeRate> {
    return Option.of(rate);
  }
}

export const ExchangeRateRepository = ExchangeRateRepo;
export type ExchangeRateRepository = ExchangeRateRepo;
