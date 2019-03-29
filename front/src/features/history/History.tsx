import { useMemo } from 'react'
import { useMappedState } from 'redux-react-hook'

import { Container } from '@front/ui/components/layout/container'
import { PageHeader } from '@front/ui/components/layout/page-header'
import { Tab, Tabs } from '@front/ui/components/layout/tabs'
import { getFirstTransactionDate } from '@front/domain/money/selectors/getFirstTransactionDate'
import { useEnvironment } from '@front/ui/hooks/useEnvironment'
import { useWindowSize } from '@front/ui/hooks/useWindowSize'

import { pushRoute } from '../routing'
import * as styles from './History.css'
import { createMonths } from './helpers/createMonths'
import { createMonthTitle } from './helpers/createMonthTitle'
import { TransactionList } from './components/transaction-list'

export const History = () => {
  const firstTransactionDate = useMappedState(getFirstTransactionDate)
  const { isClient } = useEnvironment()

  const months = useMemo(() => createMonths(firstTransactionDate, new Date()), [
    firstTransactionDate,
  ])
  const defaultMonthTitle = useMemo(() => createMonthTitle(new Date()), [])

  const { innerWidth } = useWindowSize()
  const isMobile = innerWidth && innerWidth < 768

  return (
    <Container>
      <PageHeader title="History" onBack={() => pushRoute('/app')} />

      {isClient && (
        <Tabs
          className={styles.tabs}
          defaultSelected={defaultMonthTitle}
          vertical={!isMobile}
        >
          {months.map(month => (
            <Tab
              title={month.title}
              className={styles.history}
              key={month.title}
            >
              <TransactionList
                from={month.from}
                to={month.to}
                classNames={styles}
              />
            </Tab>
          ))}
        </Tabs>
      )}
    </Container>
  )
}