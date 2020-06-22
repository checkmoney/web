import { Currency } from '&front/enum/Currency';
import { GroupBy } from '&front/enum/GroupBy';

export interface CachedPeriod {
  groupBy?: GroupBy;
  from?: Date;
  to?: Date;
  currency?: Currency;
}
