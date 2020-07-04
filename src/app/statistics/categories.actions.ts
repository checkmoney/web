import actionCreatorFactory from 'typescript-fsa';

import { Interval } from '&front/app/api/api.types';
import { PeriodType } from '&front/shared';

import { PeriodCategories } from './categories.types';

const actionCreator = actionCreatorFactory('STATISTICS_CATEGORIES');

export const actions = actionCreator.async<
  {
    periodType: PeriodType;
    dateRange: Interval;
    attempt?: number;
  },
  PeriodCategories[],
  string
>('FETCHING');
