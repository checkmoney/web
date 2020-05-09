import { take, head, sortBy } from 'lodash';
import { Option } from 'tsoption';

import { displayMoney } from '&shared/helpers/displayMoney';
import { HistoryGroupModel } from '&shared/models/money/HistoryGroupModel';

import { UnifiedTransaction } from './UnifiedTransaction';

type Filter = (transaction: UnifiedTransaction) => boolean;
const normalizedFilter = (filter?: Filter) => (
  transaction: UnifiedTransaction,
) => {
  if (filter) {
    return filter(transaction);
  }

  return true;
};

interface Options {
  maxLength?: number;
  filter?: (transaction: UnifiedTransaction) => boolean;
}

export const historyToTableData = (
  history: Option<HistoryGroupModel[]>,
  { maxLength, filter }: Options,
) =>
  history
    .flatMap(items => Option.of(head(items)))
    .map(item =>
      [
        ...item.incomes.map(income => ({
          ...income,
          date: income.date,
          amount: income.amount,
          currency: income.currency,
          comment: income.source,
        })),
        ...item.outcomes.map(outcome => ({
          ...outcome,
          date: outcome.date,
          amount: -outcome.amount,
          currency: outcome.currency,
          comment: outcome.category,
        })),
      ].filter(normalizedFilter(filter)),
    )
    .map(transactions =>
      sortBy(
        transactions,
        transaction => transaction.date && -transaction.date.valueOf(),
      ),
    )
    .map(transactions =>
      maxLength ? take(transactions, maxLength) : transactions,
    )
    .map(transactions =>
      transactions.map(transaction => ({
        ...transaction,
        rawAmount: transaction.amount,
        amount: displayMoney(transaction.currency)(transaction.amount, {
          withSign: true,
        }),
      })),
    );
