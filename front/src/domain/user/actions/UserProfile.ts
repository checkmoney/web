import { Currency } from '@shared/enum/Currency'

export interface UserProfile {
  name: string
  defaultCurrency: Currency
}
