import { createFetchingStore } from '@front/domain/store/fetchingRedux/createFetchingRedux'
import { FetchingState } from '@front/domain/store/fetchingRedux/FetchingState'

type State = FetchingState

const { reducer, actions } = createFetchingStore('user/sign-up')

export { reducer, actions, State }
