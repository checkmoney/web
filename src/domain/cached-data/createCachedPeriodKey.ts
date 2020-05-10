import { CachedPeriod } from './CachedPeriod';

export const createCachedPeriodKey = ({
  from,
  to,
  groupBy,
  currency,
}: CachedPeriod): string =>
  `${from && from.toISOString()}-${
    to && to.toISOString()
  }-by${groupBy}-in${currency}`;
