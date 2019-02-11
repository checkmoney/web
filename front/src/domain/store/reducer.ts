import { combineReducers } from 'redux'

import { reducer as userReducer } from '@front/domain/user/reducer'

import { State } from './State'

export const reducer = combineReducers<State>({
  user: userReducer,
})
