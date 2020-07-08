import uid from 'uid';

import { Expense } from '&front/application/transaction';

export const fieldsToOutcomeModel = ({
  amount,
  comment,
  currency,
  date,
}: any): Expense => ({
  id: uid(),
  amount: Math.round(parseFloat(amount) * 100),
  currency,
  category: comment,
  date,
});
