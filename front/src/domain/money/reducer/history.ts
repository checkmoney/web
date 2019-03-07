import {
  ClearAction,
  createClearReduxWithFetching,
  WithFetchingState,
} from 'redux-clear'

import { HistoryGroupModel } from '@shared/models/money/HistoryGroupModel'
import {
  CachedPeriod,
  CachedState,
  createInitialState,
  newItemProcessor,
} from '@front/domain/cached-data'

type InternalState = CachedState<HistoryGroupModel>
type State = WithFetchingState<InternalState>

interface Actions {
  addHistory: ClearAction<[CachedPeriod, HistoryGroupModel[]]>
}

const { actions, reducer } = createClearReduxWithFetching<
  InternalState,
  Actions
>(
  {
    addHistory: newItemProcessor,
  },
  createInitialState(),
)

export { State, actions, reducer }
