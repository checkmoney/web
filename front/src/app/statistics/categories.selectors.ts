import { get } from 'lodash';

import { Interval } from '&front/api/types';
import { intervalIdentity } from '&front/api/utils';
import { State } from '&front/domain/store/State';
import { GroupBy } from '&shared/enum/GroupBy';

import { PeriodCategories } from './categories.types';

export const selectCategories = (periodType: GroupBy, dateRange: Interval) => (
  state: State,
): PeriodCategories | undefined =>
  get(state, `application.statistics.categories.${periodType}`, []).find(
    (item: PeriodCategories) =>
      intervalIdentity(item.period) === intervalIdentity(dateRange),
  );

export const selectCategoriesHasError = (
  periodType: GroupBy,
  dateRange: Interval,
) => (state: State): boolean =>
  get(state, `application.statistics.categories.errors`, []).some(
    (item: any) =>
      intervalIdentity(item.dateRange) === intervalIdentity(dateRange) &&
      item.periodType === periodType,
  );
