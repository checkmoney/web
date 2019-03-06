import { useState, useCallback } from 'react'

import { Currency } from '@shared/enum/Currency'
import { ControlHeader } from '@front/ui/components/controls/control-header'
import { CurrencySwitch } from '@front/ui/components/controls/currency-switch'
import { Container } from '@front/ui/components/layout/container'
import { Tabs, Tab } from '@front/ui/components/layout/tabs'

import { Yearly } from './features/yearly'
import { Monthly } from './features/monthly'
import { Dynamics } from './features/dynamics'
import { Categories } from './features/categories'
import { Sources } from './features/sources'
import * as styles from './Statistics.css'
import { GroupBy } from '@shared/enum/GroupBy'

export const Statistics = () => {
  const [currency, setCurrency] = useState(Currency.USD)

  const renderContent = useCallback(
    (group: GroupBy.Month | GroupBy.Year) => (
      <>
        <aside className={styles.aside}>
          <Dynamics group={group} />
          <Categories currency={currency} />
          <Sources currency={currency} />
        </aside>

        <div className={styles.charts}>
          {group === GroupBy.Month && <Monthly currency={currency} />}
          {group === GroupBy.Year && <Yearly currency={currency} />}
        </div>
      </>
    ),
    [currency],
  )

  return (
    <Container>
      <ControlHeader title="Statistics">
        <CurrencySwitch currency={currency} updateCurrency={setCurrency} />
      </ControlHeader>

      <Tabs>
        <Tab title="Monthly" className={styles.statistics}>
          {renderContent(GroupBy.Month)}
        </Tab>
        <Tab title="Yearly" className={styles.statistics}>
          {renderContent(GroupBy.Year)}
        </Tab>
      </Tabs>
    </Container>
  )
}
