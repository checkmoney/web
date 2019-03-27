import {
  ClearAction,
  WithFetchingState,
  createClearReduxWithFetching,
} from 'redux-clear'

type InternalState = string[]
type State = WithFetchingState<InternalState>

interface Actions {
  addSources: ClearAction<[string[]]>
}

const { actions, reducer } = createClearReduxWithFetching<
  InternalState,
  Actions
>(
  {
    addSources: state => newSources => [...new Set([...state, ...newSources])],
  },
  [],
)

export { State, actions, reducer }
