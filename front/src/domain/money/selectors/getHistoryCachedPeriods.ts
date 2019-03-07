import { State } from '@front/domain/store'

export const getHistoryCachedPeriods = (state: State) =>
  state.money.history.data.cachedPeriods
