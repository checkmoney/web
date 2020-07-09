import uid from 'uid';

import { Earning } from '&front/application/transaction';

export const fieldsToIncomeModel = ({
  amount,
  comment,
  currency,
  date,
}: any): Earning => ({
  id: uid(),
  amount: Math.round(parseFloat(amount) * 100),
  currency,
  source: comment,
  date,
});
