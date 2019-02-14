import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useMappedState } from 'redux-react-hook'

import { fetchHistory } from '@front/domain/money/actions/fetchHistory'
import { getFetchingStatus } from '@front/domain/money/selectors/getFetchingStatus'
import { getFirstTransactionDate } from '@front/domain/money/selectors/getFirstTransactionDate'
import { getHistory } from '@front/domain/money/selectors/getHistory'
import { Loader } from '@front/ui/loader'
import { GroupBy } from '@shared/enum/GroupBy'

import { Groupment } from './organisms/Groupment'
import { Incomes } from './organisms/Incomes'
import { Outcomes } from './organisms/Outcomes'
import { Period } from './organisms/Period'

export const History = () => {
  const firstTransactionDate = useMappedState(getFirstTransactionDate)
  const fetching = useMappedState(getFetchingStatus)
  const dispatch = useDispatch()

  const [from, setFrom] = useState(firstTransactionDate)
  const [to, setTo] = useState(new Date())
  const [groupBy, setGroupBy] = useState(GroupBy.Year)

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
    <>
      <h2>History</h2>
      <Groupment groupBy={groupBy} updateGroupBy={setGroupBy} />
      <Period start={from} updateStart={setFrom} end={to} updateEnd={setTo} />
      <Loader status={fetching}>
        {history.nonEmpty() &&
          history.get().map(({ title, incomes, outcomes }) => (
            <div key={title}>
              <h3>{title}</h3>
              <Incomes incomes={incomes} />
              <Outcomes outcomes={outcomes} />
            </div>
          ))}
      </Loader>
    </>
  )
}
