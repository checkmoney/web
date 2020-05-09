import { Currency } from '&shared/enum/Currency';
import { GroupBy } from '&shared/enum/GroupBy';

export interface PastDaysBudgetMeta {
  outcome: number;
  currency: Currency;
  group: GroupBy;
}
