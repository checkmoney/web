import { Currency } from '&front/enum/Currency';

export interface UnifiedTransaction {
  date: Date | undefined;
  amount: number;
  currency: Currency;
  comment: string;
}
