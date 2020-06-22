import { Currency } from '&front/enum/Currency';

export const getCurrencySign = (currency: Currency): string =>
  ({
    [Currency.EUR]: '€',
    [Currency.USD]: '$',
    [Currency.RUB]: '₽',
    [Currency.SEK]: 'kr',
    [Currency.NOK]: 'kr',
    [Currency.DKK]: 'kr.',
    [Currency.ILS]: '₪',
    [Currency.TRY]: '₺',
    [Currency.THB]: '฿',
  }[currency]);
