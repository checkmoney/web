import { Currency } from '&front/application/profile';

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
