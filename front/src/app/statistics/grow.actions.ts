import actionCreatorFactory from 'typescript-fsa';

import { GroupBy } from '&shared/enum/GroupBy';

import { Grow } from './grow.types';

const actionCreator = actionCreatorFactory('STATISTICS_GROW');

export const actions = actionCreator.async<
  {
    periodType: GroupBy;
    attempt?: number;
  },
  Grow,
  string
>('FETCHING');
