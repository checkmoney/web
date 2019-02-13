import { combineReducers } from 'redux'

import {
  reducer as incomeFetchingReducer,
  State as IncomeFetchingState,
} from './createIncomeFetching'
import {
  reducer as outcomeFetchingReducer,
  State as OutcomeFetchingState,
} from './createOutcomeFetching'

interface State {
  createIncomeFetching: IncomeFetchingState
  createOutcomeFetching: OutcomeFetchingState
}

const reducer = combineReducers<State>({
  createIncomeFetching: incomeFetchingReducer,
  createOutcomeFetching: outcomeFetchingReducer,
})

export { reducer, State }
