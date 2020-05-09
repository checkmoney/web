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
import {
  reducer as firstTransactionDateReducer,
  State as FirstTransactionDateState,
} from './firstTransactionDate';
import { reducer as historyReducer, State as HistoryState } from './history';
import {
  reducer as listCategoriesReducer,
  State as ListCategoriesState,
} from './listCategories';
import {
  reducer as listSourceReducer,
  State as ListSourcesState,
} from './listSources';

interface State {
  createIncomeFetching: IncomeFetchingState;
  createOutcomeFetching: OutcomeFetchingState;
  history: HistoryState;
  firstTransactionDate: FirstTransactionDateState;
  deleteTransactionFetching: DeleteTransactionFetching;
  listSources: ListSourcesState;
  listCategories: ListCategoriesState;
}

const reducer = combineReducers<State>({
  createIncomeFetching: incomeFetchingReducer,
  createOutcomeFetching: outcomeFetchingReducer,
  history: historyReducer,
  firstTransactionDate: firstTransactionDateReducer,
  deleteTransactionFetching: deleteTransactionFetchingReducer,
  listSources: listSourceReducer,
  listCategories: listCategoriesReducer,
});

export { reducer, State };
