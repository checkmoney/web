import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { endOfDay, startOfDay } from 'date-fns'
import { Option } from 'tsoption'
import { Repository } from 'typeorm'

import { DateRange } from '@back/utils/infrastructure/dto/DateRange'

import { Income } from './Income.entity'
import { TransactionRepository } from './interfaces/TransactionRepository'

@Injectable()
class IncomeRepo implements TransactionRepository {
  public constructor(
    @InjectRepository(Income)
    private readonly incomeRepo: Repository<Income>,
  ) {}

  public async findForUser(
    id: string,
    userLogin: string,
  ): Promise<Option<Income>> {
    const income = await this.incomeRepo
      .createQueryBuilder('income')
      .innerJoin('income.author', 'author', 'author.login = :userLogin', {
        userLogin,
      })
      .where('income.id = :id', { id })
      .getOne()

    return Option.of(income)
  }

  public async findEarliest(userLogin: string): Promise<Option<Income>> {
    const income = await this.incomeRepo
      .createQueryBuilder('income')
      .innerJoin('income.author', 'author', 'author.login = :userLogin', {
        userLogin,
      })
      .orderBy('income.date')
      .getOne()

    return Option.of(income)
  }

  public async findByRangeForUser(
    userLogin: string,
    range: DateRange,
  ): Promise<Income[]> {
    const { from, to } = range

    const start = startOfDay(from).toISOString()
    const end = endOfDay(to).toISOString()

    return this.incomeRepo
      .createQueryBuilder('income')
      .innerJoin('income.author', 'author', 'author.login = :userLogin', {
        userLogin,
      })
      .where('income.date >= :start', { start })
      .andWhere('income.date < :end', { end })
      .getMany()
  }

  public async findSourcesForUser(userLogin: string): Promise<string[]> {
    const result = await this.incomeRepo
      .createQueryBuilder('income')
      .select('DISTINCT ON (income.source) income.source', 'source')
      .innerJoin('income.author', 'author', 'author.login = :userLogin', {
        userLogin,
      })
      .getRawMany()

    return result.map(({ source }) => source)
  }

  public async findBySourcesForUser(
    sources: string[],
    userLogin: string,
  ): Promise<Income[]> {
    return this.incomeRepo
      .createQueryBuilder('income')
      .where('income.source IN (:...sources)', { sources })
      .innerJoin('income.author', 'author', 'author.login = :userLogin', {
        userLogin,
      })
      .getMany()
  }
}

export const IncomeRepository = IncomeRepo
export type IncomeRepository = IncomeRepo
