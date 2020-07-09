enum Currency {
  RUB = 'RUB',
  USD = 'USD',
  EUR = 'EUR',
  SEK = 'SEK',
  NOK = 'NOK',
  DKK = 'DKK',
  ILS = 'ILS',
  TRY = 'TRY',
  THB = 'THB',
}

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

const currencySigns = {
  [Currency.EUR]: '€',
  [Currency.USD]: '$',
  [Currency.RUB]: '₽',
  [Currency.SEK]: 'kr',
  [Currency.NOK]: 'kr',
  [Currency.DKK]: 'kr.',
  [Currency.ILS]: '₪',
  [Currency.TRY]: '₺',
  [Currency.THB]: '฿',
};

const getCurrencyName = (currency: Currency): string => currencyNames[currency];

const getCurrencySign = (currency: Currency): string => currencySigns[currency];

export { Currency, getCurrencyName, getCurrencySign };
