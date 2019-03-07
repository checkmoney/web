import { GroupBy } from '@shared/enum/GroupBy'
import { Currency } from '@shared/enum/Currency'

export interface CachedPeriod {
  groupBy?: GroupBy
  from: Date
  to: Date
  currency?: Currency
}
