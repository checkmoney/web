import { Currency } from '&front/application/currency/domain/data';

export interface CurrencySelectProps {
  value: Currency;
  onChange: (v: Currency) => void;
}
