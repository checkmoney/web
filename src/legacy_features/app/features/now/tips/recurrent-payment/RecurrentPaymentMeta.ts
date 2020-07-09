import { Currency } from '&front/application/currency';

export type RecurrentPaymentMeta = {
  amount: number;
  category: string;
  currency: Currency;
  period: {
    from: number;
    to: number;
  };
};
