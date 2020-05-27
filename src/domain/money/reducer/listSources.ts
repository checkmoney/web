import { uniq } from 'lodash';
import {
  ClearAction,
  WithFetchingState,
  createClearReduxWithFetching,
} from 'redux-clear';

type InternalState = string[];
type State = WithFetchingState<InternalState>;

interface Actions {
  addSources: ClearAction<[string[]]>;
}

const { actions, reducer } = createClearReduxWithFetching<
  InternalState,
  Actions
>(
  {
    addSources: (state) => (newSources) => uniq([...state, ...newSources]),
  },
  [],
);

export { State, actions, reducer };
