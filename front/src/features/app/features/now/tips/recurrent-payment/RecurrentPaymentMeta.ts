import { Currency } from '&shared/enum/Currency';

export type RecurrentPaymentMeta = {
  amount: number;
  category: string;
  currency: Currency;
  period: {
    from: number;
    to: number;
  };
};
