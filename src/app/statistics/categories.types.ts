/* eslint-disable max-classes-per-file */
import { Type } from 'class-transformer';

import { Interval } from '&front/app/api/api.types';

import { TransformBigInt } from '../api/api.utils';

export class CategoryData {
  @TransformBigInt()
  readonly amount: number;

  readonly category: string;

  constructor(amount: number, category: string) {
    this.amount = amount;
    this.category = category;
  }
}

export class PeriodCategories {
  @Type(() => CategoryData)
  readonly expenses: CategoryData[];

  @Type(() => CategoryData)
  readonly earnings: CategoryData[];

  @Type(() => Interval)
  readonly period: Interval;

  constructor(
    expenses: CategoryData[],
    earnings: CategoryData[],
    period: Interval,
  ) {
    this.expenses = expenses;
    this.earnings = earnings;
    this.period = period;
  }
}
