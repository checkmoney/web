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
import { CategoryGroupOutcomeModel } from '&shared/models/money/CategoryGroupOutcomeModel';

type InternalState = CachedState<CategoryGroupOutcomeModel>;
type State = WithFetchingState<InternalState>;

interface Actions {
  addStats: ClearAction<[CachedPeriod, CategoryGroupOutcomeModel[]]>;
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
