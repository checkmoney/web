import { Currency } from '&front/application/currency';

export interface OutcomeModel {
  readonly amount: number; // penny!
  readonly currency: Currency;
  readonly category: string;
  readonly date?: Date;
}
