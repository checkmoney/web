import { Currency } from '$shared/enum/Currency'

export interface ProfileModel {
  readonly defaultCurrency: Currency
  readonly weekStartsOnMonday: boolean
}
