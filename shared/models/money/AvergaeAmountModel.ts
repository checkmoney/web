import { Currency } from '&shared/enum/Currency';

export interface AverageAmountModel {
  period: string;
  income: number;
  outcome: number;
  currency: Currency;
}
