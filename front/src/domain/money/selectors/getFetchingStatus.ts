import { State } from '@front/domain/store/State'

export const getFetchingStatus = (state: State) => state.money.historyFetching
