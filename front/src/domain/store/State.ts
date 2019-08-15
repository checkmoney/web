import { State as MoneyState } from '&front/domain/money/reducer';
import { State as UserState } from '&front/domain/user/reducer';
import { State as MindState } from '&front/domain/mind/reducer';

export interface State {
  user: UserState;
  money: MoneyState;
  mind: MindState;
}
