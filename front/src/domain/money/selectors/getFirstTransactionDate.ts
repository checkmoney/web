import { State } from '&front/domain/store'

export const getFirstTransactionDate = (state: State) =>
  state.money.firstTransactionDate
