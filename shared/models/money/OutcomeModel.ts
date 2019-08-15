import { Currency } from '&shared/enum/Currency';

export interface OutcomeModel {
  readonly amount: number; // penny!
  readonly currency: Currency;
  readonly category: string;
  readonly date?: Date;
}
