import { endOfMonth, startOfMonth } from 'date-fns'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useMappedState } from 'redux-react-hook'

import { fetchHistory } from '@front/domain/money/actions/fetchHistory'
import { getHistory } from '@front/domain/money/selectors/getHistory'
import { getHistoryFetchingStatus } from '@front/domain/money/selectors/getHistoryFetchingStatus'
import { Loader } from '@front/ui/molecules/loader'
import { Period } from '@front/ui/organisms/period'
import { GroupBy } from '@shared/enum/GroupBy'

import * as styles from './History.css'
import { Incomes } from './organisms/Incomes'
import { Outcomes } from './organisms/Outcomes'

interface Props {
  className?: string
}

const groupBy = GroupBy.Month

export const History = ({ className }: Props) => {
  const fetching = useMappedState(getHistoryFetchingStatus)
  const dispatch = useDispatch()

  const [from, setFrom] = useState(startOfMonth(new Date()))
  const [to, setTo] = useState(endOfMonth(new Date()))

  const historySelector = useCallback(getHistory(from, to, groupBy), [from, to])
  const history = useMappedState(historySelector)

  useEffect(
    () => {
      dispatch(fetchHistory(from, to, groupBy) as any)
    },
    [from, to],
  )

  return (
    <section className={className}>
      <h2>History</h2>
      <Period start={from} updateStart={setFrom} end={to} updateEnd={setTo} />
      <Loader status={fetching}>
        {history.nonEmpty() &&
          history.get().map(({ title, incomes, outcomes }) => (
            <div key={title} className={styles.dataSet}>
              <Outcomes
                outcomes={outcomes}
                periodName={title}
                className={styles.outcomes}
              />
              <Incomes
                incomes={incomes}
                periodName={title}
                className={styles.incomes}
              />
            </div>
          ))}
      </Loader>
    </section>
  )
}
