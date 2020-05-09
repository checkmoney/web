import { Currency } from '&shared/enum/Currency';
import { GroupBy } from '&shared/enum/GroupBy';

export interface CachedPeriod {
  groupBy?: GroupBy;
  from?: Date;
  to?: Date;
  currency?: Currency;
}
