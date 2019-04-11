import { combineReducers } from 'redux'

import { reducer as dataReducer, State as DataState } from './data'
import { reducer as profileReducer, State as ProfileState } from './profile'
import { reducer as signInReducer, State as SignInState } from './signIn'
import { reducer as signUpReducer, State as SignUpState } from './signUp'

interface State {
  signIn: SignInState
  signUp: SignUpState
  data: DataState
  profile: ProfileState
}

const reducer = combineReducers<State>({
  signIn: signInReducer,
  signUp: signUpReducer,
  data: dataReducer,
  profile: profileReducer,
})

export { reducer, State }
