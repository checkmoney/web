import { GroupBy } from '@shared/enum/GroupBy'

export const createHistoryKey = (
  from: Date,
  to: Date,
  groupBy: GroupBy,
): string => `${from.toISOString()}-${to.toISOString()}-by${groupBy}`
