import { State } from '@front/domain/store/State'

export const getHistoryFetchingStatus = (state: State) =>
  state.money.historyFetching
