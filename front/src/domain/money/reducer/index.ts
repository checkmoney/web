import { combineReducers } from 'redux'

import {
  reducer as incomeFetchingReducer,
  State as IncomeFetchingState,
} from './createIncomeFetching'
import {
  reducer as outcomeFetchingReducer,
  State as OutcomeFetchingState,
} from './createOutcomeFetching'
import {
  reducer as firstTransactionDateReducer,
  State as FirstTransactionDateState,
} from './firstTransactionDate'
import { reducer as historyReducer, State as HistoryState } from './history'
import {
  reducer as historyFetchingReducer,
  State as HistoryFetchingState,
} from './historyFetching'
import { reducer as statsReducer, State as StatsState } from './stats'
import {
  reducer as statsFetchingReducer,
  State as StatsFetchingState,
} from './statsFetching'

interface State {
  createIncomeFetching: IncomeFetchingState
  createOutcomeFetching: OutcomeFetchingState
  historyFetching: HistoryFetchingState
  statsFetching: StatsFetchingState
  stats: StatsState
  history: HistoryState
  firstTransactionDate: FirstTransactionDateState
}

const reducer = combineReducers<State>({
  createIncomeFetching: incomeFetchingReducer,
  createOutcomeFetching: outcomeFetchingReducer,
  historyFetching: historyFetchingReducer,
  statsFetching: statsFetchingReducer,
  stats: statsReducer,
  history: historyReducer,
  firstTransactionDate: firstTransactionDateReducer,
})

export { reducer, State }
