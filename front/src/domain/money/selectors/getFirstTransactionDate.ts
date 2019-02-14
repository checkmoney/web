import { State } from '@front/domain/store/State'

export const getFirstTransactionDate = (state: State) =>
  state.money.firstTransactionDate
