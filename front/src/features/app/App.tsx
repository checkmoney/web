import * as styles from './App.css'
import { CreateIncome } from './features/create/create-income'
import { CreateOutcome } from './features/create/create-outcome'
import { History } from './features/history'
import { Stats } from './features/stats'

export const App = () => (
  <>
    <section className={styles.app}>
      <CreateOutcome className={styles.outcome} />
      <CreateIncome className={styles.income} />
      <History className={styles.history} />
    </section>
    <Stats />
  </>
)
