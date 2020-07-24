import { Expense, Earning } from '&front/application/transaction';
import { formatMoney } from '&front/application/currency';

export const historyToTableData = (expenses: Expense[], earnings: Earning[]) =>
  [
    ...earnings.map((income) => ({
      ...income,
      date: income.date,
      amount: income.amount,
      currency: income.currency,
      comment: income.source,
    })),
    ...expenses.map((outcome) => ({
      ...outcome,
      date: outcome.date,
      amount: -outcome.amount,
      currency: outcome.currency,
      comment: outcome.category,
    })),
  ]
    .map((transaction) => ({
      ...transaction,
      rawAmount: transaction.amount,
      amount: formatMoney(transaction.currency, {
        withPenny: true,
        withSign: true,
      })(transaction.amount),
    }))
    .sort(
      ({ date: dateA }, { date: dateB }) =>
      (dateB?.valueOf() ?? 0) - (dateA?.valueOf() ?? 0),
    );
