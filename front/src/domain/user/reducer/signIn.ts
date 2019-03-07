import { createFetchingRedux, FetchingState } from 'redux-clear'

type State = FetchingState

const { reducer, actions } = createFetchingRedux('user/sign-in')

export { reducer, actions, State }
