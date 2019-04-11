import { State } from '@front/domain/store'

export const getDefaultCurrency = (state: State) =>
  state.user.user.data.profile.defaultCurrency
