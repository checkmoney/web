import { State } from '&front/domain/store/State';
import { PeriodType, DateRange } from '&front/shared';

import { PeriodCategories } from './categories.types';

export const selectCategories = (
  periodType: PeriodType,
  dateRange: DateRange,
) => (state: State) =>
  (state.application.statistics.categories[periodType] || []).find(
    (item: PeriodCategories) => item.period.identity === dateRange.identity,
  );

export const selectCategoriesHasError = (
  periodType: PeriodType,
  dateRange: DateRange,
) => (state: State) =>
  state.application.statistics.categories.errors.some(
    (item) =>
      item.dateRange.identity === dateRange.identity &&
      item.periodType === periodType,
  );
