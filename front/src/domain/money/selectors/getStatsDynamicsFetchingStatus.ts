import { State } from '@front/domain/store'

export const getStatsDynamicsFetchingStatus = (state: State) =>
  state.money.statsDynamics.fetching
