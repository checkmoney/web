import { Currency } from '&front/application/profile';
import { GroupBy } from '&front/enum/GroupBy';

export interface PastDaysBudgetMeta {
  outcome: number;
  currency: Currency;
  group: GroupBy;
}
