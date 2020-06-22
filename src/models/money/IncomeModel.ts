import { Currency } from '&front/enum/Currency';

export interface IncomeModel {
  readonly amount: number; // penny!
  readonly currency: Currency;
  readonly source: string;
  readonly date?: Date;
}
