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
} from '&front/domain/cached-data'
import { SourceGroupIncomeModel } from '&shared/models/money/SourceGroupIncomeModel'

type InternalState = CachedState<SourceGroupIncomeModel>
type State = WithFetchingState<InternalState>

interface Actions {
  addStats: ClearAction<[CachedPeriod, SourceGroupIncomeModel[]]>
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
