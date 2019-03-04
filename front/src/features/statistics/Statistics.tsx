import { useState } from 'react'

import { Currency } from '@shared/enum/Currency'
import { ControlHeader } from '@front/ui/components/controls/control-header'
import { CurrencySwitch } from '@front/ui/components/controls/currency-switch'
import { Container } from '@front/ui/components/layout/container'

import { Yearly } from './features/yearly'
import { Monthly } from './features/monthly'
import { Tabs, Tab } from '@front/ui/components/layout/tabs'

export const Statistics = () => {
  const [currency, setCurrency] = useState(Currency.USD)

  return (
    <Container>
      <ControlHeader title="Statistics">
        <CurrencySwitch currency={currency} updateCurrency={setCurrency} />
      </ControlHeader>

      <Tabs>
        <Tab title="Monthly">
          <Monthly currency={currency} />
        </Tab>
        <Tab title="Yearly">
          <Yearly currency={currency} />
        </Tab>
      </Tabs>
    </Container>
  )
}
