import {
  ClearAction,
  WithFetchingState,
  createClearReduxWithFetching,
} from 'redux-clear'

import { DateGroupModel } from '$shared/models/money/DateGroupModel'
import {
  CachedPeriod,
  CachedState,
  createInitialState,
  newItemProcessor,
} from '$front/domain/cached-data'

type InternalState = CachedState<DateGroupModel>
type State = WithFetchingState<InternalState>

interface Actions {
  addStats: ClearAction<[CachedPeriod, DateGroupModel[]]>
}

const { actions, reducer } = createClearReduxWithFetching<
  InternalState,
  Actions
>(
  {
    addStats: newItemProcessor,
  },
  createInitialState(),
)

export { State, actions, reducer }
