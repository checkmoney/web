/* eslint-disable max-classes-per-file */

import { Type } from 'class-transformer';

import { Currency } from '&front/application/currency';

export class Earning {
  readonly id: string;

  readonly amount: number; // penny!

  readonly currency: Currency;

  readonly source: string;

  @Type(() => Date)
  readonly date?: Date;
}

export class Expense {
  readonly id: string;

  readonly amount: number; // penny!

  readonly currency: Currency;

  readonly category: string;

  @Type(() => Date)
  readonly date?: Date;
}
