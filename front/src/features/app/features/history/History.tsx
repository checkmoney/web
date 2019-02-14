import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useMappedState } from 'redux-react-hook'
import { Option } from 'tsoption'

import { fetchHistory } from '@front/domain/money/actions/fetchHistory'
import { getFetchingStatus } from '@front/domain/money/selectors/getFetchingStatus'
import { getHistory } from '@front/domain/money/selectors/getHistory'
import { Loader } from '@front/ui/loader'
import { GroupBy } from '@shared/enum/GroupBy'

export const History = () => {
  const [from] = useState(new Date('2018-01-01'))
  const [to] = useState(new Date())
  const [groupBy] = useState(GroupBy.Year)

  const fetching = useMappedState(getFetchingStatus)

  const historySelector = useCallback(getHistory(from, to, groupBy), [
    from,
    to,
    groupBy,
  ])
  const history = useMappedState(historySelector)

  const dispatch = useDispatch()
  useEffect(
    () => {
      dispatch(fetchHistory(from, to, groupBy) as any)
    },
    [from, to, groupBy],
  )

  return (
    <>
      <h2>History</h2>
      <Loader status={fetching}>
        {history
          .map(realHistory =>
            realHistory.map(group => (
              <>
                <h3>{group.title}</h3>
                <h4>Incomes</h4>
                {group.incomes.map(({ amount, currency, source, date }) => (
                  <p>
                    {Option.of(date)
                      .map(d => d.toDateString())
                      .getOrElse('')}
                    {' — '}
                    {amount / 100} {currency} ({source})
                  </p>
                ))}
                <h4>Outcomes</h4>
                {group.outcomes.map(({ amount, currency, category, date }) => (
                  <p>
                    {Option.of(date)
                      .map(d => d.toDateString())
                      .getOrElse('')}
                    {' — '}
                    {amount / 100} {currency} ({category})
                  </p>
                ))}
              </>
            )),
          )
          .getOrElse([])}
      </Loader>
    </>
  )
}
