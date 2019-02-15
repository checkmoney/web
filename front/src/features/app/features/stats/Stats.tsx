import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useMappedState } from 'redux-react-hook'

import { fetchStats } from '@front/domain/money/actions/fetchStats'
import { createStatsKey } from '@front/domain/money/helpers/createStatsKey'
import { getFirstTransactionDate } from '@front/domain/money/selectors/getFirstTransactionDate'
import { getStats } from '@front/domain/money/selectors/getStats'
import { getStatsFetchingStatus } from '@front/domain/money/selectors/getStatsFetchingStatus'
import { Loader } from '@front/ui/molecules/loader'
import { Groupment } from '@front/ui/organisms/groupment'
import { Period } from '@front/ui/organisms/period'
import { Currency } from '@shared/enum/Currency'
import { GroupBy } from '@shared/enum/GroupBy'

import { CurrencySwitch } from './organisms/CurrencySwitch'

export const Stats = () => {
  const firstTransactionDate = useMappedState(getFirstTransactionDate)
  const fetching = useMappedState(getStatsFetchingStatus)
  const dispatch = useDispatch()

  const [from, setFrom] = useState(firstTransactionDate)
  const [to, setTo] = useState(new Date())
  const [groupBy, setGroupBy] = useState(GroupBy.Year)
  const [currency, setCurrency] = useState(Currency.USD)

  const updateTriggers = [from, to, groupBy, currency]

  const statsSelector = useCallback(
    getStats(from, to, groupBy, currency),
    updateTriggers,
  )
  const stats = useMappedState(statsSelector)

  useEffect(() => {
    dispatch(fetchStats(from, to, groupBy, currency) as any)
  }, updateTriggers)

  return (
    <>
      <h2>Stats</h2>
      <Groupment groupBy={groupBy} updateGroupBy={setGroupBy} />
      <Period start={from} updateStart={setFrom} end={to} updateEnd={setTo} />
      <CurrencySwitch currency={currency} updateCurrency={setCurrency} />
      <Loader status={fetching}>
        {stats.nonEmpty() &&
          stats.get().map(({ start, end, income, outcome }) => (
            <div key={createStatsKey(start, end, groupBy, currency)}>
              <h3>
                from {start.toDateString()} to {end.toDateString()}
              </h3>
              <p>
                Income: {income / 100} {currency}
              </p>
              <p>
                Outcome: {outcome / 100} {currency}
              </p>
            </div>
          ))}
      </Loader>
    </>
  )
}
