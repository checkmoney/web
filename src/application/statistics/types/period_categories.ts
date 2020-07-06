/* eslint-disable max-classes-per-file */

import { Type } from 'class-transformer';

import { TransformBigInt, DateRange } from '&front/shared';

class CategoryData {
  @TransformBigInt()
  readonly amount: number;

  readonly category: string;
}

class PeriodCategories {
  @Type(() => CategoryData)
  readonly expenses: CategoryData[];

  @Type(() => CategoryData)
  readonly earnings: CategoryData[];

  @Type(() => DateRange)
  readonly period: DateRange;
}

export { PeriodCategories, CategoryData };
