import {
  createFetchingStore,
  FetchingState,
} from '@front/domain/fetching-redux'

type State = FetchingState

const { reducer, actions } = createFetchingStore(
  'transaction/create-income-fetching',
)

export { reducer, actions, State }
