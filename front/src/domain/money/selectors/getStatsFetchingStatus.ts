import { State } from '@front/domain/store/State'

export const getStatsFetchingStatus = (state: State) =>
  state.money.statsFetching
