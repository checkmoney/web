import {
  ClearAction,
  WithFetchingState,
  createClearReduxWithFetching,
} from 'redux-clear';

import {
  CachedPeriod,
  CachedState,
  createInitialState,
  newItemProcessor,
} from '&front/domain/cached-data';
import { DateGroupModel } from '&shared/models/money/DateGroupModel';

type InternalState = CachedState<DateGroupModel>;
type State = WithFetchingState<InternalState>;

interface Actions {
  addStats: ClearAction<[CachedPeriod, DateGroupModel[]]>;
}

const { actions, reducer } = createClearReduxWithFetching<
  InternalState,
  Actions
>(
  {
    addStats: newItemProcessor,
  },
  createInitialState(),
);

export { State, actions, reducer };
