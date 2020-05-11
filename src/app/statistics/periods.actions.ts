import actionCreatorFactory from 'typescript-fsa';

import { GroupBy } from '&shared/enum/GroupBy';
import { Interval } from '&front/app/api/api.types';

import { PeriodAmount } from './periods.types';

const actionCreator = actionCreatorFactory('STATISTICS_PERIODS');

export const actions = actionCreator.async<
  {
    periodType: GroupBy;
    dateRange: Interval;
    attempt?: number;
  },
  PeriodAmount[],
  string
>('FETCHING');
