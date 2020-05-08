import { uniq } from 'lodash';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { GroupBy } from '&shared/enum/GroupBy';

import { actions } from './grow.actions';
import { Grow } from './grow.types';

type StateData = { [key in GroupBy]?: Grow };

export interface GrowState extends StateData {
  errors: GroupBy[];
}

const initialState: GrowState = {
  errors: [],
};

export const growReducer = reducerWithInitialState(initialState)
  .case(actions.done, (state, { params, result }) => ({
    ...state,
    [params.periodType]: result,
    errors: state.errors.filter(error => error !== params.periodType),
  }))
  .case(actions.failed, (state, { params }) => ({
    ...state,
    errors: uniq([...state.errors, params.periodType]),
  }));
