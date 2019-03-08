import {
  ClearAction,
  WithFetchingState,
  createClearReduxWithFetching,
} from 'redux-clear'

import {
  CachedPeriod,
  CachedState,
  createInitialState,
  newItemProcessor,
} from '@front/domain/cached-data'
import { AverageAmountModel } from '@shared/models/money/AvergaeAmountModel'

type InternalState = CachedState<AverageAmountModel>
type State = WithFetchingState<InternalState>

interface Actions {
  addStats: ClearAction<[CachedPeriod, AverageAmountModel[]]>
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
