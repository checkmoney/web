import { CreateIncome } from './features/create-income'
import { CreateOutcome } from './features/create-outcome'
import { History } from './features/history'
import { Stats } from './features/stats'

export const App = () => (
  <>
    <CreateIncome />
    <CreateOutcome />
    <History />
    <Stats />
  </>
)
