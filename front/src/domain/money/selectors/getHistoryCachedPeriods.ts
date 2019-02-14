import { State } from '@front/domain/store/State'

export const getHistoryCachedPeriods = (state: State) =>
  state.money.history.cachedPeriods
