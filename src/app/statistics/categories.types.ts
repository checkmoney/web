/* eslint-disable max-classes-per-file */
import { Type } from 'class-transformer';

import { TransformBigInt, DateRange } from '&front/shared';

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

  @Type(() => DateRange)
  readonly period: DateRange;

  constructor(
    expenses: CategoryData[],
    earnings: CategoryData[],
    period: DateRange,
  ) {
    this.expenses = expenses;
    this.earnings = earnings;
    this.period = period;
  }
}
