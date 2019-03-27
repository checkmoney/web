import {
  ClearAction,
  WithFetchingState,
  createClearReduxWithFetching,
} from 'redux-clear'

type InternalState = string[]
type State = WithFetchingState<InternalState>

interface Actions {
  addCategories: ClearAction<[string[]]>
}

const { actions, reducer } = createClearReduxWithFetching<
  InternalState,
  Actions
>(
  {
    addCategories: state => newCategories => [
      ...state.filter(category => newCategories.includes(category)),
      ...newCategories,
    ],
  },
  [],
)

export { State, actions, reducer }
