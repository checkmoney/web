/* eslint-disable max-classes-per-file */

import { createStore, attach } from 'effector';
import { Type } from 'class-transformer';
import { isWithinRange } from 'date-fns';

import { TransformBigInt, DateRange, PeriodType } from '&front/shared';
import { requestFx, Method } from '&front/application/api';

import { mergePeriodicStatistics } from './utils/merge_periodic_statistics';

class CategoryData {
  @TransformBigInt()
  readonly amount: number;

  readonly category: string;
}

class PeriodCategories {
  @Type(() => CategoryData)
  readonly expenses: CategoryData[];

  @Type(() => CategoryData)
  readonly earnings: CategoryData[];

  @Type(() => DateRange)
  readonly period: DateRange;
}

type CategoriesState = { [key in PeriodType]?: PeriodCategories[] };

const fetchCategoriesFx = attach({
  effect: requestFx,
  mapParams: ({ periodType, dateRange }) => ({
    path: '/v1/statistics/categories',
    query: { periodType, ...dateRange },
    method: Method.Get,
    targetClass: PeriodCategories,
  }),
});

const $categories = createStore<CategoriesState>({}).on(
  fetchCategoriesFx.done,
  (state, { params: { periodType }, result: { data } }) =>
    mergePeriodicStatistics(state, periodType, data),
);

const selectCategoriesByPeriod = (
  state: CategoriesState,
  [periodType, { start, end }]: [PeriodType, DateRange],
) =>
  (state[periodType] || []).find((item) =>
    isWithinRange(item.period.start, start, end),
  ) || null;

export { $categories, fetchCategoriesFx, selectCategoriesByPeriod };
