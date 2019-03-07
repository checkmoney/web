import { createFetchingRedux, FetchingState } from 'redux-clear'

type State = FetchingState

const { reducer, actions } = createFetchingRedux('user/sign-up')

export { reducer, actions, State }
