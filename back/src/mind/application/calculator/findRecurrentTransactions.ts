import { getDate } from 'date-fns';

import { Outcome } from '&back/money/domain/Outcome.entity';

import { groupHasSameTransaction } from './helpers/groupHasSameTransaction';

export const findRecurrentTransactions = (
  previousMonths: Outcome[][],
  daysGap: number,
) => {
  const [initialGroup, ...otherGroups] = previousMonths;
  const now = new Date();

  return initialGroup
    .filter(transaction =>
      otherGroups.every(group =>
        groupHasSameTransaction(group, transaction, daysGap),
      ),
    )
    .filter(transaction => {
      const transactionDate = getDate(transaction.date);
      const nowDate = getDate(now);

      const future = transactionDate >= nowDate;
      const soon = Math.abs(transactionDate - nowDate) < daysGap;

      return future && soon;
    });
};
