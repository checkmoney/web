import { Earning } from '&front/application/transaction';

export const fieldsToIncomeModel = ({
  amount,
  comment,
  currency,
  date,
}: any): Earning => ({
  amount: Math.round(parseFloat(amount) * 100),
  currency,
  source: comment,
  date,
});
