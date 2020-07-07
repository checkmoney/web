import { Currency } from '&front/application/currency';
import { PeriodType } from '&front/shared';

export interface PastDaysBudgetMeta {
  outcome: number;
  currency: Currency;
  group: PeriodType;
}
