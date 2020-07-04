import { Currency } from '&front/application/profile';
import { PeriodType } from '&front/shared';

export interface CachedPeriod {
  groupBy?: PeriodType;
  from?: Date;
  to?: Date;
  currency?: Currency;
}
