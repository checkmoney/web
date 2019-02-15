import { Currency } from '@shared/enum/Currency'
import { GroupBy } from '@shared/enum/GroupBy'

export const createStatsKey = (
  from: Date,
  to: Date,
  groupBy: GroupBy,
  currency: Currency,
): string =>
  `${from.toISOString()}-${to.toISOString()}-by${groupBy}-in${currency}`
