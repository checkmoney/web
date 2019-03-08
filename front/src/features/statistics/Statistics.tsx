import { useState, useCallback } from 'react'

import { Currency } from '@shared/enum/Currency'
import { CurrencySwitch } from '@front/ui/components/controls/currency-switch'
import { Container } from '@front/ui/components/layout/container'
import { Tabs, Tab } from '@front/ui/components/layout/tabs'
import { GroupBy } from '@shared/enum/GroupBy'

import { Yearly } from './features/yearly'
import { Monthly } from './features/monthly'
import { Dynamics } from './features/dynamics'
import { Categories } from './features/categories'
import { Sources } from './features/sources'
import * as styles from './Statistics.css'

const columnWidthPercent = 40
const maxLength = 5

export const Statistics = () => {
  const [currency, setCurrency] = useState(Currency.USD)

  const renderContent = useCallback(
    (title: string, group: GroupBy.Month | GroupBy.Year) => (
      <Tab title={title} className={styles.statistics}>
        <aside className={styles.aside}>
          <Dynamics group={group} currency={currency} />
          <Categories
            group={group}
            currency={currency}
            widthPercent={columnWidthPercent}
            maxLength={maxLength}
          />
          <Sources
            group={group}
            currency={currency}
            widthPercent={columnWidthPercent}
            maxLength={maxLength}
          />
        </aside>

        <div className={styles.charts}>
          {group === GroupBy.Month && <Monthly currency={currency} />}
          {group === GroupBy.Year && <Yearly currency={currency} />}
        </div>
      </Tab>
    ),
    [currency],
  )

  return (
    <Container>
      <Tabs
        tabBarExtraContent={
          <CurrencySwitch currency={currency} updateCurrency={setCurrency} />
        }
      >
        {renderContent('Monthly', GroupBy.Month)}
        {renderContent('Yearly', GroupBy.Year)}
      </Tabs>
    </Container>
  )
}
