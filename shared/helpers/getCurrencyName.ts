import { Currency } from '@shared/enum/Currency'

export const getCurrencyName = (currency: Currency): string =>
  ({
    [Currency.EUR]: 'Euro',
    [Currency.USD]: 'US Dollar',
    [Currency.RUB]: 'Russian ruble',
    [Currency.SEK]: 'Swedish krona',
    [Currency.NOK]: 'Norwegian krone',
    [Currency.DKK]: 'Danish krone',
  }[currency])
