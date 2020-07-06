import actionCreatorFactory from 'typescript-fsa';

import { PeriodType, DateRange } from '&front/shared';

import { PeriodCategories } from './categories.types';

const actionCreator = actionCreatorFactory('STATISTICS_CATEGORIES');

export const actions = actionCreator.async<
  {
    periodType: PeriodType;
    dateRange: DateRange;
    attempt?: number;
  },
  PeriodCategories[],
  string
>('FETCHING');
