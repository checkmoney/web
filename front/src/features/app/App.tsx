import * as styles from './App.css'
import { CreateIncome } from './features/create/create-income'
import { CreateOutcome } from './features/create/create-outcome'
import { History } from './features/history'
import { Stats } from './features/stats'
import { Container } from '@front/ui/components/layout/container'

export const App = () => (
  <Container className={styles.app}>
    <CreateOutcome className={styles.outcome} />
    <CreateIncome className={styles.income} />
    <Stats className={styles.stats} />
    <History className={styles.history} />
  </Container>
)
