import { Currency } from '&front/application/currency/domain/currency';

export interface CurrencySelectProps {
  value: Currency;
  onChange: (v: Currency) => void;
}
