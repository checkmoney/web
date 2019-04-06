import { combineReducers } from 'redux'

import { reducer as dataReducer, State as DataState } from './data'
import { reducer as userReducer, State as UserState } from './user'
import { reducer as signInReducer, State as SignInState } from './signIn'
import { reducer as signUpReducer, State as SignUpState } from './signUp'

interface State {
  signIn: SignInState
  signUp: SignUpState
  data: DataState
  user: UserState
}

const reducer = combineReducers<State>({
  signIn: signInReducer,
  signUp: signUpReducer,
  data: dataReducer,
  user: userReducer,
})

export { reducer, State }
