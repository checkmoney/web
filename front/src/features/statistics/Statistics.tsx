import { useState } from 'react'

import { Currency } from '@shared/enum/Currency'
import { ControlHeader } from '@front/ui/components/controls/control-header'
import { CurrencySwitch } from '@front/ui/components/controls/currency-switch'
import { Container } from '@front/ui/components/layout/container'
import { Tabs, Tab } from '@front/ui/components/layout/tabs'

import { Yearly } from './features/yearly'
import { Monthly } from './features/monthly'
import { ThisMonth } from './features/this-month'
import { Categories } from './features/categories'
import { Sources } from './features/sources'
import * as styles from './Statistics.css'

export const Statistics = () => {
  const [currency, setCurrency] = useState(Currency.USD)

  return (
    <Container className={styles.statistics}>
      <ControlHeader title="Statistics" className={styles.header}>
        <CurrencySwitch currency={currency} updateCurrency={setCurrency} />
      </ControlHeader>

      <aside className={styles.aside}>
        <ThisMonth />
        <Categories currency={currency} />
        <Sources currency={currency} />
      </aside>

      <Tabs className={styles.charts}>
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
