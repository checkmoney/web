import {
  createFetchingStore,
  FetchingState,
} from '@front/domain/fetching-redux'

type State = FetchingState

const { reducer, actions } = createFetchingStore(
  'transaction/create-outcome-fetching',
)

export { reducer, actions, State }
