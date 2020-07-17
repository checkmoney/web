import { createStore, attach } from 'effector';
import { isWithinRange } from 'date-fns';

import { PeriodType, DateRange } from '&front/shared';
import { requestFx, Method } from '&front/application/api';

import { mergePeriodicStatistics } from './utils/merge_periodic_statistics';
import { StatisticsRequest } from '../types/statistics_request';
import { PeriodAmount } from '../types/period_amount';

type PeriodsState = { [key in PeriodType]?: PeriodAmount[] };

const fetchPeriodAmountsFx = attach({
  effect: requestFx,
  mapParams: ({ periodType, dateRange }: StatisticsRequest) => ({
    path: `/s/statistics/periods`,
    query: { periodType, ...dateRange },
    method: Method.Get,
    targetClass: PeriodAmount,
  }),
});

const $periods = createStore<PeriodsState>({}).on(
  fetchPeriodAmountsFx.done,
  (state, { params: { periodType }, result: { data } }) =>
    mergePeriodicStatistics(state, periodType, data),
);

const selectAmoutsByPeriod = (
  state: PeriodsState,
  [periodType, { start, end }]: [PeriodType, DateRange],
) =>
  (state[periodType] || []).filter((item) =>
    isWithinRange(item.period.start, start, end),
  );

export { $periods, fetchPeriodAmountsFx, selectAmoutsByPeriod };
