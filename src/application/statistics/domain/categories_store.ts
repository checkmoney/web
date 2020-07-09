import { createStore, attach } from 'effector';
import { isWithinRange } from 'date-fns';

import { DateRange, PeriodType } from '&front/shared';
import { requestFx, Method } from '&front/application/api';

import { mergePeriodicStatistics } from './utils/merge_periodic_statistics';
import { StatisticsRequest } from '../types/statistics_request';
import { PeriodCategories, CategoryData } from '../types/period_categories';

const fetchCategoriesFx = attach({
  effect: requestFx,
  mapParams: ({ periodType, dateRange }: StatisticsRequest) => ({
    path: '/v1/statistics/categories',
    query: { periodType, ...dateRange },
    method: Method.Get,
    targetClass: PeriodCategories,
  }),
});

type CategoriesState = { [key in PeriodType]?: PeriodCategories[] };

const $categories = createStore<CategoriesState>({}).on(
  fetchCategoriesFx.done,
  (state, { params: { periodType }, result: { data } }) =>
    mergePeriodicStatistics(state, periodType, data),
);

const $categoriesStatus = fetchCategoriesFx.pending.map((loading) => ({
  loading,
}));

const selectCategoriesByPeriod = (
  state: CategoriesState,
  [periodType, { start, end }]: [PeriodType, DateRange],
) =>
  (state[periodType] || []).find((item) =>
    isWithinRange(item.period.start, start, end),
  ) || null;

const selectTotalInPeriod = (
  state: CategoriesState,
  params: [PeriodType, DateRange],
) => {
  const data = selectCategoriesByPeriod(state, params);

  const sum = (categories?: CategoryData[]) =>
    (categories || []).map(({ amount }) => amount).reduce((a, b) => a + b, 0);

  return {
    expenses: sum(data?.expenses),
    earnings: sum(data?.earnings),
  };
};

export {
  $categories,
  $categoriesStatus,
  fetchCategoriesFx,
  selectCategoriesByPeriod,
  selectTotalInPeriod,
};
