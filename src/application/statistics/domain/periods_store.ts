import { createStore, attach } from 'effector';
import { Type } from 'class-transformer';
import { isWithinRange } from 'date-fns';

import { PeriodType, TransformBigInt, DateRange } from '&front/shared';
import { requestFx, Method } from '&front/application/api';

import { mergePeriodicStatistics } from './utils/merge_periodic_statistics';

export class PeriodAmount {
  @TransformBigInt()
  readonly expenses: number;

  @TransformBigInt()
  readonly earnings: number;

  @Type(() => DateRange)
  readonly period: DateRange;
}

type PeriodsState = { [key in PeriodType]?: PeriodAmount[] };

const fetchPeriodAmountsFx = attach({
  effect: requestFx,
  mapParams: ({ periodType, dateRange }) => ({
    path: `/v1/statistics/periods`,
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

const selectTotalAmountByPeriod = (
  state: PeriodsState,
  [periodType, dateRange]: [PeriodType, DateRange],
) => {
  const amounts = selectAmoutsByPeriod(state, [periodType, dateRange]);

  return amounts.reduce(
    (prev, curr) => ({
      expenses: prev.expenses + curr.expenses,
      earnings: prev.earnings + curr.earnings,
    }),
    { expenses: 0, earnings: 0 },
  );
};

export {
  $periods,
  fetchPeriodAmountsFx,
  selectAmoutsByPeriod,
  selectTotalAmountByPeriod,
};
