import { combineReducers } from 'redux'

import {
  reducer as incomeFetchingReducer,
  State as IncomeFetchingState,
} from './createIncomeFetching'
import {
  reducer as outcomeFetchingReducer,
  State as OutcomeFetchingState,
} from './createOutcomeFetching'
import { reducer as historyReducer, State as HistoryState } from './history'
import {
  reducer as historyFetchingReducer,
  State as HistoryFetchingState,
} from './historyFetching'

interface State {
  createIncomeFetching: IncomeFetchingState
  createOutcomeFetching: OutcomeFetchingState
  historyFetching: HistoryFetchingState
  history: HistoryState
}

const reducer = combineReducers<State>({
  createIncomeFetching: incomeFetchingReducer,
  createOutcomeFetching: outcomeFetchingReducer,
  historyFetching: historyFetchingReducer,
  history: historyReducer,
})

export { reducer, State }
