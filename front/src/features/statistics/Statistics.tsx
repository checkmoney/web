import { useState } from 'react'

import { Currency } from '@shared/enum/Currency'
import { ControlHeader } from '@front/ui/components/controls/control-header'
import { CurrencySwitch } from '@front/ui/components/controls/currency-switch'

import { Yearly } from './features/yearly'
import { Monthly } from './features/monthly'

export const Statistics = () => {
  const [currency, setCurrency] = useState(Currency.USD)

  return (
    <main>
      <ControlHeader title="Statistics">
        <CurrencySwitch currency={currency} updateCurrency={setCurrency} />
      </ControlHeader>

      <Monthly currency={currency} />
      <Yearly currency={currency} />
    </main>
  )
}
