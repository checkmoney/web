import { Currency } from '@shared/enum/Currency'

export interface ProfileModel {
  readonly name?: string
  currency?: Currency
}
