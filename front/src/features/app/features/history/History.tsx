import { endOfMonth, startOfMonth } from 'date-fns'
import { useMappedState } from 'redux-react-hook'

import { fetchHistory } from '@front/domain/money/actions/fetchHistory'
import { getHistory } from '@front/domain/money/selectors/getHistory'
import { getHistoryFetchingStatus } from '@front/domain/money/selectors/getHistoryFetchingStatus'
import { useMemoState } from '@front/domain/store'
import { GroupBy } from '@shared/enum/GroupBy'
import { ControlHeader } from '@front/ui/components/controls/control-header'
import { wantUTC } from '@front/helpers/wantUTC'

import { Incomes } from './components/Incomes'
import { Outcomes } from './components/Outcomes'
import * as styles from './History.css'

interface Props {
  className?: string
}

const groupBy = GroupBy.Month
const historyLength = 5
const from = wantUTC(startOfMonth)(new Date())
const to = wantUTC(endOfMonth)(new Date())

export const History = ({ className }: Props) => {
  const fetching = useMappedState(getHistoryFetchingStatus)

  const history = useMemoState(
    () => getHistory(from, to, groupBy),
    () => fetchHistory(from, to, groupBy),
    [from, to],
  )

  return (
    <section className={className}>
      <ControlHeader title="Last transactions" />
      <div className={styles.dataSet}>
        <Outcomes
          fetching={fetching}
          history={history}
          className={styles.outcomes}
          maxCount={historyLength}
        />
        <Incomes
          fetching={fetching}
          history={history}
          className={styles.incomes}
          maxCount={historyLength}
        />
      </div>
    </section>
  )
}
