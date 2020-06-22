import { Currency } from '&front/enum/Currency';

export type RecurrentPaymentMeta = {
  amount: number;
  category: string;
  currency: Currency;
  period: {
    from: number;
    to: number;
  };
};
