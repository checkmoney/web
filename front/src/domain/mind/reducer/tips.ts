import {
  ClearAction,
  WithFetchingState,
  createClearReduxWithFetching,
} from 'redux-clear'

import { TipModel } from '@shared/models/mind/TipModel'
import { uniqByWithRespect } from '@front/helpers/uniqByWithRespect'

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
    addTips: state => newTips =>
      uniqByWithRespect(
        [...state, ...newTips],
        tip => tip.token,
        tip => tip.date.valueOf(),
      ),
    removeTips: state => forRemove =>
      state.filter(tip => !forRemove.includes(tip.token)),
  },
  [],
)

export { State, actions, reducer }
