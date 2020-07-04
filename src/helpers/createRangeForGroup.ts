import {
  startOfMonth,
  startOfYear,
  endOfYear,
  endOfMonth,
  subYears,
  subMonths,
} from 'date-fns';

import { PeriodType } from '&front/shared';

import { wantUTC } from './wantUTC';

export const createRangeForGroup = (
  group: PeriodType,
  previousPeriodNumber = 0,
) => {
  const minus = wantUTC(group === PeriodType.Month ? subMonths : subYears);
  const now = minus(new Date(), previousPeriodNumber);

  const start = wantUTC(
    group === PeriodType.Month ? startOfMonth : startOfYear,
  );
  const end = wantUTC(group === PeriodType.Month ? endOfMonth : endOfYear);

  return { from: start(now), to: end(now) };
};
