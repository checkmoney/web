import { uniqBy } from 'lodash';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { Interval } from '&front/app/api/api.types';
import { intervalIdentity } from '&front/app/api/api.utils';
import { GroupBy } from '&shared/enum/GroupBy';

import { actions } from './periods.actions';
import { PeriodAmount } from './periods.types';

type StateData = { [key in GroupBy]?: PeriodAmount[] };

export interface PeriodsState extends StateData {
  errors: Array<{ dateRange: Interval; periodType: GroupBy }>;
}

const initialState: PeriodsState = {
  errors: [],
};

export const periodsReducer = reducerWithInitialState(initialState)
  .case(actions.done, (state, { params, result }) => ({
    ...state,
    [params.periodType]: uniqBy(
      [...(state[params.periodType] || []), ...result],
      (item) => intervalIdentity(item.period),
    ),
    errors: state.errors.filter(
      (error) =>
        intervalIdentity(error.dateRange) !==
          intervalIdentity(params.dateRange) &&
        error.periodType !== params.periodType,
    ),
  }))
  .case(actions.failed, (state, { params }) => ({
    ...state,
    errors: uniqBy(
      [...state.errors, params],
      (error) => `${intervalIdentity(error.dateRange)}-${error.periodType}`,
    ),
  }));
