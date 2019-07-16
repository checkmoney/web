import { Currency } from '&shared/enum/Currency'

export const getCurrencySign = (currency: Currency): string =>
  ({
    [Currency.EUR]: '€',
    [Currency.USD]: '$',
    [Currency.RUB]: '₽',
    [Currency.SEK]: 'kr',
    [Currency.NOK]: 'kr',
    [Currency.DKK]: 'kr.',
  }[currency])
