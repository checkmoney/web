import { State } from '@front/domain/store'

export const getCurrency = (state: State) => state.user.user.defaultCurrency
