import { endOfMonth, startOfMonth } from 'date-fns'
import { useEffect } from 'react'
import { useMappedState } from 'redux-react-hook'

import { fetchHistory } from '@front/domain/money/actions/fetchHistory'
import { getHistory } from '@front/domain/money/selectors/getHistory'
import { getHistoryFetchingStatus } from '@front/domain/money/selectors/getHistoryFetchingStatus'
import { useThunk, useMemoState } from '@front/domain/store'
import { Period } from '@front/ui/components/form/period'
import { Loader } from '@front/ui/components/layout/loader'
import { GroupBy } from '@shared/enum/GroupBy'
import { ControlHeader } from '@front/ui/components/controls/control-header'
import { useActualDateRange } from '@front/ui/hooks/useActualDateRange'
import { wantUTC } from '@front/helpers/wantUTC'

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

  const { from, setFrom, to, setTo, actualFrom, actualTo } = useActualDateRange(
    new Date(),
    new Date(),
    wantUTC(startOfMonth),
    wantUTC(endOfMonth),
  )

  const history = useMemoState(
    () => getHistory(actualFrom, actualTo, groupBy),
    [actualFrom, actualTo],
  )

  useEffect(() => {
    dispatch(fetchHistory(actualFrom, actualTo, groupBy))
  }, [actualFrom, actualTo])

  return (
    <section className={className}>
      <ControlHeader title="History">
        <Period start={from} updateStart={setFrom} end={to} updateEnd={setTo} />
      </ControlHeader>
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
