import {
  ClearAction,
  WithFetchingState,
  createClearReduxWithFetching,
} from 'redux-clear'
import { uniqBy } from 'lodash'

import { TipModel } from '@shared/models/mind/TipModel'

type InternalState = TipModel[]
type State = WithFetchingState<InternalState>

interface Actions {
  addTips: ClearAction<[TipModel[]]>
  removeTips: ClearAction<[string[]]>
}

const { actions, reducer } = createClearReduxWithFetching<
  InternalState,
  Actions
>(
  {
    addTips: state => newTips => uniqBy([...state, ...newTips], 'token'),
    removeTips: state => forRemove =>
      state.filter(tip => !forRemove.includes(tip.token)),
  },
  [],
)

export { State, actions, reducer }
