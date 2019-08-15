import { getDate } from 'date-fns';

import { Outcome } from '&back/money/domain/Outcome.entity';

export const groupHasSameTransaction = (
  group: Outcome[],
  transaction: Outcome,
  daysGap: number,
) =>
  group.some(target => {
    const sameAmount = target.amount === transaction.amount;
    const sameCurrency = target.currency === transaction.currency;
    const sameDate =
      Math.abs(getDate(target.date) - getDate(transaction.date)) <= daysGap;
    const sameCategory = target.category === transaction.category;

    return sameAmount && sameCurrency && sameDate && sameCategory;
  });
