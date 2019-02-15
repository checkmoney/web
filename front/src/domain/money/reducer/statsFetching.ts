import { createFetchingStore } from '@front/domain/store/fetchingRedux/createFetchingRedux'
import { FetchingState } from '@front/domain/store/fetchingRedux/FetchingState'

type State = FetchingState

const { reducer, actions } = createFetchingStore('transaction/stats-fetching')

export { reducer, actions, State }
