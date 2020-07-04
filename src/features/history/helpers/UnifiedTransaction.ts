import { Currency } from '&front/application/profile';

export interface UnifiedTransaction {
  date: Date | undefined;
  amount: number;
  currency: Currency;
  comment: string;
}
