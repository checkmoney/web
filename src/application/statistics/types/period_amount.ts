import { Type } from 'class-transformer';

import { TransformBigInt, DateRange } from '&front/shared';

export class PeriodAmount {
  @TransformBigInt()
  readonly expenses: number;

  @TransformBigInt()
  readonly earnings: number;

  @Type(() => DateRange)
  readonly period: DateRange;
}
