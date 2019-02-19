import { useCallback } from 'react'

import { getCurrencyName } from '@front/helpers/getCurrencyName'
import { EnumSelect } from '@front/ui/molecules/select'
import { Currency } from '@shared/enum/Currency'

interface Props {
  currency: Currency
  updateCurrency: (newCurrenct: Currency) => void
}

export const CurrencySwitch = ({ currency, updateCurrency }: Props) => {
  const onChange = useCallback(
    (v?: string) => {
      updateCurrency((v as Currency) || currency)
    },
    [updateCurrency, currency],
  )

  return (
    <EnumSelect
      options={Currency}
      value={currency}
      onChange={onChange}
      showSearch
      getLabel={getCurrencyName}
    />
  )
}
