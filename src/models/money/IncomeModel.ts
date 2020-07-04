import { Currency } from '&front/application/profile';

export interface IncomeModel {
  readonly amount: number; // penny!
  readonly currency: Currency;
  readonly source: string;
  readonly date?: Date;
}
