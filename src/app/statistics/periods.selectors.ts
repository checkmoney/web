import { isWithinRange } from 'date-fns';

import { Interval } from '&front/api/types';
import { intervalIdentity } from '&front/api/utils';
import { State } from '&front/domain/store/State';
import { GroupBy } from '&shared/enum/GroupBy';

export const selectPeriods = (periodType: GroupBy, dateRange: Interval) => (
  state: State,
) =>
  (state.application.statistics.periods[periodType] || []).filter((item) =>
    isWithinRange(item.period.start, dateRange.start, dateRange.end),
  );

export const selectPeriodsHasError = (
  periodType: GroupBy,
  dateRange: Interval,
) => (state: State) =>
  state.application.statistics.periods.errors.some(
    (item) =>
      intervalIdentity(item.dateRange) === intervalIdentity(dateRange) &&
      item.periodType === periodType,
  );
