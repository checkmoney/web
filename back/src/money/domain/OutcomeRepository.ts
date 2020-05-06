import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { endOfDay, startOfDay } from 'date-fns';
import { Option } from 'tsoption';
import { Repository } from 'typeorm';

import { DateRange } from '&back/utils/infrastructure/dto/DateRange';

import { TransactionRepository } from './interfaces/TransactionRepository';
import { Outcome } from './Outcome.entity';

@Injectable()
class OutomeRepo implements TransactionRepository {
  public constructor(
    @InjectRepository(Outcome)
    private readonly outcomeRepo: Repository<Outcome>,
  ) {}

  async fetchByIdsForUser(ids: string[], userLogin: string) {
    if (ids.length === 0) {
      return [];
    }

    const outcomes = await this.outcomeRepo
      .createQueryBuilder('outcome')
      .innerJoin('outcome.author', 'author', 'author.login = :userLogin', {
        userLogin,
      })
      .where('outcome.id IN (:...ids)', { ids })
      .getMany();

    return outcomes;
  }

  async getTotalCountForUser(userLogin: string) {
    const count = await this.outcomeRepo
      .createQueryBuilder('outcome')
      .where('outcome."authorLogin" = :userLogin', { userLogin })
      .getCount();

    return count;
  }

  async fetchIds(
    userLogin: string,
    offset: number,
    limit: number,
  ): Promise<string[]> {
    const result = await this.outcomeRepo
      .createQueryBuilder('outcome')
      .where('outcome."authorLogin" = :userLogin', { userLogin })
      .orderBy('outcome.date')
      .offset(offset)
      .limit(limit)
      .select('id')
      .getRawMany();

    return result.map(({ id }) => id);
  }

  public async findForUser(
    id: string,
    userLogin: string,
  ): Promise<Option<Outcome>> {
    const outcome = await this.outcomeRepo
      .createQueryBuilder('outcome')
      .innerJoin('outcome.author', 'author', 'author.login = :userLogin', {
        userLogin,
      })
      .where('outcome.id = :id', { id })
      .getOne();

    return Option.of(outcome);
  }

  public async findEarliest(userLogin: string): Promise<Option<Outcome>> {
    const income = await this.outcomeRepo
      .createQueryBuilder('outcome')
      .innerJoin('outcome.author', 'author', 'author.login = :userLogin', {
        userLogin,
      })
      .orderBy('outcome.date')
      .getOne();

    return Option.of(income);
  }

  public async findByRangeForUser(
    userLogin: string,
    range: DateRange,
  ): Promise<Outcome[]> {
    const { from, to } = range;

    const start = startOfDay(from).toISOString();
    const end = endOfDay(to).toISOString();

    return this.outcomeRepo
      .createQueryBuilder('outcome')
      .innerJoin('outcome.author', 'author', 'author.login = :userLogin', {
        userLogin,
      })
      .where('outcome.date >= :start', { start })
      .andWhere('outcome.date < :end', { end })
      .getMany();
  }

  public async findCategoriesForUser(userLogin: string): Promise<string[]> {
    const result = await this.outcomeRepo
      .createQueryBuilder('outcome')
      .select('DISTINCT ON (outcome.category) outcome.category', 'category')
      .innerJoin('outcome.author', 'author', 'author.login = :userLogin', {
        userLogin,
      })
      .getRawMany();

    return result.map(({ category }) => category);
  }

  public async findByCategoriesForUser(
    categories: string[],
    userLogin: string,
  ): Promise<Outcome[]> {
    return this.outcomeRepo
      .createQueryBuilder('outcome')
      .where('outcome.category IN (:...categories)', { categories })
      .innerJoin('outcome.author', 'author', 'author.login = :userLogin', {
        userLogin,
      })
      .getMany();
  }
}

export const OutcomeRepository = OutomeRepo;
export type OutcomeRepository = OutomeRepo;
