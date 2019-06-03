import { Currency } from '$shared/enum/Currency'

export interface CategoryGroupOutcomeModel {
  readonly category: string
  readonly outcome: number
  readonly currency: Currency
}
