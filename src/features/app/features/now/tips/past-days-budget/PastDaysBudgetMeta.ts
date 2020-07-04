import { Currency } from '&front/application/profile';
import { PeriodType } from '&front/shared';

export interface PastDaysBudgetMeta {
  outcome: number;
  currency: Currency;
  group: PeriodType;
}
