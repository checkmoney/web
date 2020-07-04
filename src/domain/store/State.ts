import { ApplicationState } from '&front/app';
import { State as MindState } from '&front/domain/mind/reducer';
import { State as MoneyState } from '&front/domain/money/reducer';

export interface State {
  money: MoneyState;
  mind: MindState;
  application: ApplicationState;
}
