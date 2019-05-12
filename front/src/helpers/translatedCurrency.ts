import { Currency } from '@shared/enum/Currency'

export const translatedCurrency = (currency: Currency): string =>
  `currency:${currency}`
