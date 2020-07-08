import { combineReducers } from 'redux';

import {
  reducer as incomeFetchingReducer,
  State as IncomeFetchingState,
} from './createIncomeFetching';
import {
  reducer as outcomeFetchingReducer,
  State as OutcomeFetchingState,
} from './createOutcomeFetching';
import {
  reducer as deleteTransactionFetchingReducer,
  State as DeleteTransactionFetching,
} from './deleteTransactionFetching';
import { reducer as historyReducer, State as HistoryState } from './history';

interface State {
  createIncomeFetching: IncomeFetchingState;
  createOutcomeFetching: OutcomeFetchingState;
  history: HistoryState;
  deleteTransactionFetching: DeleteTransactionFetching;
}

const reducer = combineReducers<State>({
  createIncomeFetching: incomeFetchingReducer,
  createOutcomeFetching: outcomeFetchingReducer,
  history: historyReducer,
  deleteTransactionFetching: deleteTransactionFetchingReducer,
});

export { reducer, State };
