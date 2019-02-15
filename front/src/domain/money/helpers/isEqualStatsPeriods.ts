import { Currency } from '@shared/enum/Currency'
import { GroupBy } from '@shared/enum/GroupBy'

interface HistoryPeriod {
  groupBy: GroupBy
  from: Date
  to: Date
  currency: Currency
}

export const isEquelStatsPeriods = (
  a: HistoryPeriod,
  b: HistoryPeriod,
): boolean => {
  const equalsGroupBy = a.groupBy === b.groupBy
  const equalsFrom = a.from.toDateString() === b.from.toDateString()
  const equalsTo = a.to.toDateString() === b.to.toDateString()
  const equalsCurrency = a.currency === b.currency

  return equalsGroupBy && equalsFrom && equalsTo && equalsCurrency
}
