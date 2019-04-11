import { Currency } from '@shared/enum/Currency'

export interface ProfileFields {
  readonly name?: string
  readonly currency?: Currency
}
