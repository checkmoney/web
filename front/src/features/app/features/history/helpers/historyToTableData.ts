import { Option } from 'tsoption'
import { take, head, sortBy } from 'lodash'

import { HistoryGroupModel } from '@shared/models/money/HistoryGroupModel'
import { displayMoney } from '@shared/helpers/displayMoney'

export const historyToTableData = (
  history: Option<HistoryGroupModel[]>,
  maxLength: number,
) =>
  history
    .flatMap(items => Option.of(head(items)))
    .map(item => [
      ...item.incomes.map(income => ({
        date: income.date,
        amount: income.amount,
        currency: income.currency,
        comment: income.source,
      })),
      ...item.outcomes.map(outcome => ({
        date: outcome.date,
        amount: -outcome.amount,
        currency: outcome.currency,
        comment: outcome.category,
      })),
    ])
    .map(transactions =>
      sortBy(
        transactions,
        transaction => transaction.date && -transaction.date.valueOf(),
      ),
    )
    .map(transactions => take(transactions, maxLength))
    .map(transactions =>
      transactions.map(transaction => ({
        ...transaction,
        amount: displayMoney(transaction.currency)(transaction.amount, {
          withSign: true,
        }),
      })),
    )
