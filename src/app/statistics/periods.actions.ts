import actionCreatorFactory from 'typescript-fsa';

import { Interval } from '&front/app/api/api.types';
import { PeriodType } from '&front/shared';

import { PeriodAmount } from './periods.types';

const actionCreator = actionCreatorFactory('STATISTICS_PERIODS');

export const actions = actionCreator.async<
  {
    periodType: PeriodType;
    dateRange: Interval;
    attempt?: number;
  },
  PeriodAmount[],
  string
>('FETCHING');
