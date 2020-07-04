import { Currency } from '&front/application/profile';
import { GroupBy } from '&front/enum/GroupBy';

export interface CachedPeriod {
  groupBy?: GroupBy;
  from?: Date;
  to?: Date;
  currency?: Currency;
}
