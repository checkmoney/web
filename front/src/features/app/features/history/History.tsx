import { max, startOfMonth } from 'date-fns'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useMappedState } from 'redux-react-hook'

import { fetchHistory } from '@front/domain/money/actions/fetchHistory'
import { getFirstTransactionDate } from '@front/domain/money/selectors/getFirstTransactionDate'
import { getHistory } from '@front/domain/money/selectors/getHistory'
import { getHistoryFetchingStatus } from '@front/domain/money/selectors/getHistoryFetchingStatus'
import { Loader } from '@front/ui/molecules/loader'
import { Groupment } from '@front/ui/organisms/groupment'
import { Period } from '@front/ui/organisms/period'
import { GroupBy } from '@shared/enum/GroupBy'

import * as styles from './History.css'
import { Incomes } from './organisms/Incomes'
import { Outcomes } from './organisms/Outcomes'

interface Props {
  className?: string
}

export const History = ({ className }: Props) => {
  const firstTransactionDate = useMappedState(getFirstTransactionDate)
  const fetching = useMappedState(getHistoryFetchingStatus)
  const dispatch = useDispatch()

  const [from, setFrom] = useState(
    max(firstTransactionDate, startOfMonth(new Date())),
  )
  const [to, setTo] = useState(new Date())
  const [groupBy, setGroupBy] = useState(GroupBy.Month)

  const updateTriggers = [from, to, groupBy]

  const historySelector = useCallback(
    getHistory(from, to, groupBy),
    updateTriggers,
  )
  const history = useMappedState(historySelector)

  useEffect(() => {
    dispatch(fetchHistory(from, to, groupBy) as any)
  }, updateTriggers)

  return (
    <section className={className}>
      <h2>History</h2>
      <Groupment groupBy={groupBy} updateGroupBy={setGroupBy} />
      <Period start={from} updateStart={setFrom} end={to} updateEnd={setTo} />
      <Loader status={fetching}>
        {history.nonEmpty() &&
          history.get().map(({ title, incomes, outcomes }) => (
            <div key={title} className={styles.dataSet}>
              <h3 className={styles.title}>{title}</h3>
              <Outcomes outcomes={outcomes} className={styles.outcomes} />
              <Incomes incomes={incomes} className={styles.incomes} />
            </div>
          ))}
      </Loader>
    </section>
  )
}
