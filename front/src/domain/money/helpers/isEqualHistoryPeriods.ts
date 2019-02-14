import { GroupBy } from '@shared/enum/GroupBy'

interface HistoryPeriod {
  groupBy: GroupBy
  from: Date
  to: Date
}

export const isEqueslHistoryPeriods = (
  a: HistoryPeriod,
  b: HistoryPeriod,
): boolean => {
  const equalsGroupBy = a.groupBy === b.groupBy
  const equalsFrom = a.from.toDateString() === b.from.toDateString()
  const equalsTo = a.to.toDateString() === b.to.toDateString()

  return equalsGroupBy && equalsFrom && equalsTo
}
