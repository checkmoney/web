import { Currency } from '@shared/enum/Currency'

export interface DateRangeStats {
  currency: Currency
  start: Date
  end: Date
  income: number
  outcome: number
}
