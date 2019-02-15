import { State } from '@front/domain/store/State'

export const getStatsCachedPeriods = (state: State) =>
  state.money.stats.cachedPeriods
