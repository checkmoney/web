import { combineReducers } from 'redux'

import { reducer as tipsReducer, State as TipsState } from './tips'

interface State {
  tips: TipsState
}

const reducer = combineReducers<State>({
  tips: tipsReducer,
})

export { reducer, State }
