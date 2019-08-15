import { Currency } from '&shared/enum/Currency';

import { AbstractTransaction } from '../interfaces/AbstarctTransaction';

export class Transaction implements AbstractTransaction {
  public constructor(
    public readonly amount: number,
    public readonly currency: Currency,
    public readonly date: Date,
  ) {}
}
