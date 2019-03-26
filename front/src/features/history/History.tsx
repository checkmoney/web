import { useMemo } from 'react'
import { useMappedState } from 'redux-react-hook'

import { Container } from '@front/ui/components/layout/container'
import { PageHeader } from '@front/ui/components/layout/page-header'
import { Tab, Tabs } from '@front/ui/components/layout/tabs'
import { getFirstTransactionDate } from '@front/domain/money/selectors/getFirstTransactionDate'

import { pushRoute } from '../routing'
import * as styles from './History.css'
import { createMonths } from './helpers/createMonths'
import { createMonthTitle } from './helpers/createMonthTitle'
import { TransactionList } from './components/transaction-list'

export const History = () => {
  const firstTransactionDate = useMappedState(getFirstTransactionDate)

  const months = useMemo(() => createMonths(firstTransactionDate, new Date()), [
    firstTransactionDate,
  ])
  const defaultMonthTitle = useMemo(() => createMonthTitle(new Date()), [])

  return (
    <Container>
      <PageHeader title="History" onBack={() => pushRoute('/app')} />

      <Tabs
        className={styles.tabs}
        defaultSelected={defaultMonthTitle}
        vertical
      >
        {months.map(month => (
          <Tab title={month.title} className={styles.history} key={month.title}>
            <TransactionList
              from={month.from}
              to={month.to}
              classNames={styles}
            />
          </Tab>
        ))}
      </Tabs>
    </Container>
  )
}
