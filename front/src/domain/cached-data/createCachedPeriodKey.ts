import { CachedPeriod } from './CachedPeriod'

export const createCachedPeriodKey = ({
  from,
  to,
  groupBy,
  currency,
}: CachedPeriod): string =>
  `${from.toISOString()}-${to.toISOString()}-by${groupBy}-in${currency}`
