import { Currency } from '&front/enum/Currency';
import { GroupBy } from '&front/enum/GroupBy';

export interface PastDaysBudgetMeta {
  outcome: number;
  currency: Currency;
  group: GroupBy;
}
