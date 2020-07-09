import { Currency } from '&front/application/currency';

export interface UnifiedTransaction {
  date: Date | undefined;
  amount: number;
  currency: Currency;
  comment: string;
}
