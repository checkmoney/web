import { combineReducers } from 'redux'

import { reducer as dataReducer, State as DataState } from './data'
import { reducer as signInReducer, State as SignInState } from './signIn'

interface State {
  signIn: SignInState
  data: DataState
}

const reducer = combineReducers<State>({
  signIn: signInReducer,
  data: dataReducer,
})

export { reducer, State }
