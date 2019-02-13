import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Option } from 'tsoption'
import { Repository } from 'typeorm'

import { DateRange } from '@back/utils/infrastructure/dto/DateRange'

import { Outcome } from './Outcome.entity'

@Injectable()
class OutomeRepo {
  public constructor(
    @InjectRepository(Outcome)
    private readonly outcomeRepo: Repository<Outcome>,
  ) {}

  public async findEarliest(userLogin: string): Promise<Option<Outcome>> {
    const income = await this.outcomeRepo
      .createQueryBuilder('outcome')
      .innerJoin('outcome.author', 'author', 'author.login = :userLogin', {
        userLogin,
      })
      .orderBy('outcome.date')
      .getOne()

    return Option.of(income)
  }

  public async findByRangeForUser(
    userLogin: string,
    range: DateRange,
  ): Promise<Outcome[]> {
    const { from, to } = range

    const start = from.toISOString()
    const end = to.toISOString()

    return this.outcomeRepo
      .createQueryBuilder('outcome')
      .innerJoin('outcome.author', 'author', 'author.login = :userLogin', {
        userLogin,
      })
      .where('outcome.date >= :start', { start })
      .andWhere('outcome.date < :end', { end })
      .getMany()
  }
}

export const OutcomeRepository = OutomeRepo
export type OutcomeRepository = OutomeRepo
