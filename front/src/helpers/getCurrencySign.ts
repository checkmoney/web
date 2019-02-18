import { Currency } from '@shared/enum/Currency'

export const getCurrencySign = (currency: Currency): string =>
  ({
    [Currency.EUR]: '€',
    [Currency.USD]: '$',
    [Currency.RUB]: '	₽',
  }[currency])
