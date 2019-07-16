import { Currency } from '&shared/enum/Currency'

export interface SourceGroupIncomeModel {
  readonly source: string
  readonly income: number
  readonly currency: Currency
}
