import { State } from '@front/domain/store'

export const getStatsFetchingStatus = (state: State) =>
  state.money.statsDynamics.fetching
