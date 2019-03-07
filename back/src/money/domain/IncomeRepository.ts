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
}

export const IncomeRepository = IncomeRepo
export type IncomeRepository = IncomeRepo
