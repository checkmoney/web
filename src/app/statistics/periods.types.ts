import { Type } from 'class-transformer';

import { Interval } from '../api/api.types';
import { TransformBigInt } from '../api/api.utils';

export class PeriodAmount {
  @TransformBigInt()
  readonly expenses: number;

  @TransformBigInt()
  readonly earnings: number;

  @Type(() => Interval)
  readonly period: Interval;

  constructor(expenses: number, earnings: number, period: Interval) {
    this.expenses = expenses;
    this.earnings = earnings;
    this.period = period;
  }
}
