import { State as MoneyState } from '@front/domain/money/reducer'
import { State as UserState } from '@front/domain/user/reducer'

export interface State {
  user: UserState
  money: MoneyState
}
