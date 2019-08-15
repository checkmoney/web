import { Currency } from '&shared/enum/Currency';

export interface AbstractTransaction {
  amount: number;
  currency: Currency;
  date: Date;
}
