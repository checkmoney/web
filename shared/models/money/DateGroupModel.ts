import { Currency } from '&shared/enum/Currency';

export interface DateGroupModel {
  readonly start: Date;
  readonly end: Date;
  readonly income: number;
  readonly outcome: number;
  readonly currency: Currency;
}
