import { Currency } from '@shared/enum/Currency'

interface Props {
  currency: Currency
  updateCurrency: (newCurrenct: Currency) => void
}

export const CurrencySwitch = ({ currency, updateCurrency }: Props) => (
  <>
    {Object.values(Currency).map(value =>
      value === currency ? (
        <span key={value}>{value}</span>
      ) : (
        <button key={value} onClick={() => updateCurrency(value)}>
          {value}
        </button>
      ),
    )}
  </>
)
