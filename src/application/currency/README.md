# Domain: Currency

Handle available currencies and user preferences

## API

### Store

#### \$currency

Store with user default currency.

```tsx
const MyComponent = () => {
  const defaultCurrency = useStore($currency);

  if (!userDefaultCurrency) {
    return <p>Default currency is not available</p>;
  }

  return <p>Your defualt currency is {defaultCurrency}</p>;
};
```

### Effects

#### setUserCurrencyFx

Effect for change user default currency.

```tsx
const MyComponent = () => {
  const handleClick = () => setUserCurrencyFx(Currency.USD);

  return <button onCLick={handleClick}>I want to use USD</button>;
};
```

### Gates

#### CurrencyGate

Gate for requiring user default currency.

```tsx
const MyComponent = () => {
  useGate(CurrencyGate);

  return <p>Currency fetching starts at mount this component</p>;
};
```

### Components

#### CurrencySelect

Dumb component for select currency.

```tsx
const MyComponent = () => {
  const [currency, setCurrency] = useState(Currency.USD);

  return <CurrencySelect value={currency} onChange={setCurrency} />;
};
```

### Others

- `Currency` — enum with all available currencies;
- `formatMoney` — transforms currency and number to readble format
- `getCurrencyName` — transforms currency to human readble name;
- `getCurrencySign` — transforms currency to nice sign;
