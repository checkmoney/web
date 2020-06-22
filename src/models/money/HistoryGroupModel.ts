import { IncomeModel } from './IncomeModel';
import { OutcomeModel } from './OutcomeModel';

export interface HistoryGroupModel {
  title: string;
  incomes: IncomeModel[];
  outcomes: OutcomeModel[];
}
