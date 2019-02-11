import { combineReducers } from 'redux'

import { reducer as dataReducer, State as DataState } from './data'
import { reducer as signInReducer, State as SignInState } from './signIn'
import { reducer as signUpReducer, State as SignUpState } from './signUp'

interface State {
  signIn: SignInState
  signUp: SignUpState
  data: DataState
}

const reducer = combineReducers<State>({
  signIn: signInReducer,
  signUp: signUpReducer,
  data: dataReducer,
})

export { reducer, State }
