import { isWithinRange } from 'date-fns';

import { Interval } from '&front/app/api/api.types';
import { intervalIdentity } from '&front/app/api/api.utils';
import { State } from '&front/domain/store/State';
import { PeriodType } from '&front/shared';

export const selectPeriods = (periodType: PeriodType, dateRange: Interval) => (
  state: State,
) =>
  (state.application.statistics.periods[periodType] || []).filter((item) =>
    isWithinRange(item.period.start, dateRange.start, dateRange.end),
  );

export const selectPeriodsHasError = (
  periodType: PeriodType,
  dateRange: Interval,
) => (state: State) =>
  state.application.statistics.periods.errors.some(
    (item) =>
      intervalIdentity(item.dateRange) === intervalIdentity(dateRange) &&
      item.periodType === periodType,
  );
