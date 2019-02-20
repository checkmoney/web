import {
  createFetchingStore,
  FetchingState,
} from '@front/domain/fetching-redux'

type State = FetchingState

const { reducer, actions } = createFetchingStore('user/sign-in')

export { reducer, actions, State }
