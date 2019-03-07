import { createFetchingRedux, FetchingState } from 'redux-clear'

type State = FetchingState

const { reducer, actions } = createFetchingRedux('transaction/delete')

export { reducer, actions, State }
