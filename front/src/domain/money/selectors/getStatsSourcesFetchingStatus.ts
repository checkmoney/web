import { State } from '@front/domain/store'

export const getStatsSourcesFetchingStatus = (state: State) =>
  state.money.statsSources.fetching
