import { endOfMonth, startOfMonth } from 'date-fns'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useMappedState } from 'redux-react-hook'

import { fetchHistory } from '@front/domain/money/actions/fetchHistory'
import { getHistory } from '@front/domain/money/selectors/getHistory'
import { getHistoryFetchingStatus } from '@front/domain/money/selectors/getHistoryFetchingStatus'
import { Loader } from '@front/ui/molecules/loader'
import { Period } from '@front/ui/organisms/period'
import { GroupBy } from '@shared/enum/GroupBy'

import { Header } from '../../components/Header/Header'
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

  const [actualFrom, actualTo] = useMemo(
    () => [startOfMonth(from), endOfMonth(to)],
    [from, to],
  )

  const historySelector = useCallback(
    getHistory(actualFrom, actualTo, groupBy),
    [actualFrom, actualTo],
  )
  const history = useMappedState(historySelector)

  useEffect(
    () => {
      dispatch(fetchHistory(actualFrom, actualTo, groupBy) as any)
    },
    [actualFrom, actualTo],
  )

  return (
    <section className={className}>
      <Header title="History">
        <Period start={from} updateStart={setFrom} end={to} updateEnd={setTo} />
      </Header>
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
