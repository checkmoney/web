import { ClearAction, createClearRedux } from 'redux-clear'
import { Option } from 'tsoption'

interface State {
  error: Option<string>
  loading: boolean
}

interface Actions {
  request: ClearAction
  failure: ClearAction<[string]>
}

const { reducer, actions } = createClearRedux<State, Actions>(
  {
    request: state => () => ({
      ...state,
      error: Option.of(null),
      loading: true,
    }),
    failure: state => error => ({
      ...state,
      error: Option.of(error),
      loading: false,
    }),
  },
  {
    loading: false,
    error: Option.of(null),
  },
  'user',
)

export { reducer, actions, State }
