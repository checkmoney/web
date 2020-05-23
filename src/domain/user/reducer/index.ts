import { combineReducers } from 'redux';

import { reducer as profileReducer, State as ProfileState } from './profile';
import { reducer as signInReducer, State as SignInState } from './signIn';
import { reducer as signUpReducer, State as SignUpState } from './signUp';

interface State {
  signIn: SignInState;
  signUp: SignUpState;
  profile: ProfileState;
}

const reducer = combineReducers<State>({
  signIn: signInReducer,
  signUp: signUpReducer,
  profile: profileReducer,
});

export { reducer, State };
