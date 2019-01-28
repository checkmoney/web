import { Currency } from '@shared/enum/Currency'

export interface DateGroupModel {
  readonly start: string
  readonly end: string
  readonly income: number
  readonly outcome: number
  readonly currency: Currency
}
