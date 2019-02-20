import { State } from '@front/domain/store'

export const getHistoryFetchingStatus = (state: State) =>
  state.money.historyFetching
