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
  reducer as statsDynamicsReducer,
  State as StatsDynamicsState,
} from './statsDynamics'
import {
  reducer as statsSourcesReducer,
  State as StatsSourcesState,
} from './statsSources'
import {
  reducer as statsCategoriesReducer,
  State as StatsCategoriesState,
} from './statsCategories'
import {
  reducer as deleteTransactionFetchingReducer,
  State as DeleteTransactionFetching,
} from './deleteTransactionFetching'

interface State {
  createIncomeFetching: IncomeFetchingState
  createOutcomeFetching: OutcomeFetchingState
  statsDynamics: StatsDynamicsState
  statsSources: StatsSourcesState
  statsCategories: StatsCategoriesState
  history: HistoryState
  firstTransactionDate: FirstTransactionDateState
  deleteTransactionFetching: DeleteTransactionFetching
}

const reducer = combineReducers<State>({
  createIncomeFetching: incomeFetchingReducer,
  createOutcomeFetching: outcomeFetchingReducer,
  statsDynamics: statsDynamicsReducer,
  statsSources: statsSourcesReducer,
  statsCategories: statsCategoriesReducer,
  history: historyReducer,
  firstTransactionDate: firstTransactionDateReducer,
  deleteTransactionFetching: deleteTransactionFetchingReducer,
})

export { reducer, State }
