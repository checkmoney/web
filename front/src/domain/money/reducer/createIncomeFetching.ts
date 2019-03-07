import { createFetchingRedux, FetchingState } from 'redux-clear'

type State = FetchingState

const { reducer, actions } = createFetchingRedux(
  'transaction/create-income-fetching',
)

export { reducer, actions, State }
