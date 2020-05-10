import { Currency } from '&shared/enum/Currency';

const currencyNames = {
  RUB: 'Российский рубль',
  USD: 'Доллар США',
  EUR: 'Евро',
  SEK: 'Шведская крона',
  NOK: 'Норвежская крона',
  DKK: 'Датская крона',
  ILS: 'Новый израильский шекель',
  TRY: 'Турецкая лира',
  THB: 'Тайский бат',
};

export const translatedCurrency = (currency: Currency): string =>
  currencyNames[currency];
