import { Container } from '@front/ui/components/layout/container'

import * as styles from './App.css'
import { CreateOutcome } from './features/create/create-outcome'
import { CreateIncome } from './features/create/create-income'
import { History } from './features/history'
import { Navigation } from './features/navigation'

export const App = () => (
  <Container className={styles.app}>
    <Navigation className={styles.nav} />
    <CreateOutcome className={styles.outcome} />
    <CreateIncome className={styles.income} />
    <History className={styles.history} />
  </Container>
)
