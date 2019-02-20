import { State } from '@front/domain/store'

export const getStatsCachedPeriods = (state: State) =>
  state.money.stats.cachedPeriods
