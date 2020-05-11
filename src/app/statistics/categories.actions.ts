import actionCreatorFactory from 'typescript-fsa';

import { Interval } from '&front/app/api/api.types';
import { GroupBy } from '&shared/enum/GroupBy';

import { PeriodCategories } from './categories.types';

const actionCreator = actionCreatorFactory('STATISTICS_CATEGORIES');

export const actions = actionCreator.async<
  {
    periodType: GroupBy;
    dateRange: Interval;
    attempt?: number;
  },
  PeriodCategories[],
  string
>('FETCHING');
