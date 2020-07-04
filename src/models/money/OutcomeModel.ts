import { Currency } from '&front/application/profile';

export interface OutcomeModel {
  readonly amount: number; // penny!
  readonly currency: Currency;
  readonly category: string;
  readonly date?: Date;
}
