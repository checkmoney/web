import { ClearAction, createClearRedux } from 'redux-clear'
import { Option } from 'tsoption'

interface State {
  token: Option<string>
}

interface Actions {
  setToken: ClearAction<[string]>
  resetToken: ClearAction
}

const { reducer, actions } = createClearRedux<State, Actions>(
  {
    setToken: state => token => ({
      ...state,
      token: Option.of(token),
    }),
    resetToken: state => () => ({
      ...state,
      token: Option.of(null),
    }),
  },
  {
    token: Option.of(null),
  },
  'user',
)

export { reducer, actions, State }
