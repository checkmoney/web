import { CachedPeriod } from './CachedPeriod';

export const isEqualCachedPeriods = (
  a: CachedPeriod,
  b: CachedPeriod,
): boolean => {
  const equalsGroupBy = a.groupBy === b.groupBy;
  const equalsFrom =
    !!a.from && !!b.from && a.from.toDateString() === b.from.toDateString();
  const equalsTo =
    !!a.to && !!b.to && a.to.toDateString() === b.to.toDateString();
  const equalsCurrency = a.currency === b.currency;

  return equalsGroupBy && equalsFrom && equalsTo && equalsCurrency;
};
