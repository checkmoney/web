import { endOfMonth, startOfMonth } from 'date-fns'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useMappedState } from 'redux-react-hook'

import { fetchHistory } from '@front/domain/money/actions/fetchHistory'
import { getHistory } from '@front/domain/money/selectors/getHistory'
import { getHistoryFetchingStatus } from '@front/domain/money/selectors/getHistoryFetchingStatus'
import { useThunk } from '@front/domain/store'
import { Period } from '@front/ui/components/form/period'
import { Loader } from '@front/ui/components/layout/loader'
import { GroupBy } from '@shared/enum/GroupBy'

import { Header } from '../../components/header'
import { Incomes } from './components/Incomes'
import { Outcomes } from './components/Outcomes'
import * as styles from './History.css'

interface Props {
  className?: string
}

const groupBy = GroupBy.Month

export const History = ({ className }: Props) => {
  const fetching = useMappedState(getHistoryFetchingStatus)
  const dispatch = useThunk()

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

  useEffect(() => {
    dispatch(fetchHistory(actualFrom, actualTo, groupBy))
  }, [actualFrom, actualTo])

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
