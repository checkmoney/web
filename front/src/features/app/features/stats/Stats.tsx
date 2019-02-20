import { endOfYear, format, startOfYear } from 'date-fns'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useMappedState } from 'redux-react-hook'

import { fetchStats } from '@front/domain/money/actions/fetchStats'
import { getFirstTransactionDate } from '@front/domain/money/selectors/getFirstTransactionDate'
import { getStats } from '@front/domain/money/selectors/getStats'
import { getStatsFetchingStatus } from '@front/domain/money/selectors/getStatsFetchingStatus'
import { useThunk } from '@front/domain/store'
import { displayMoney } from '@front/helpers/displayMoney'
import { BarChart } from '@front/ui/components/chart/bar-chart'
import { Period } from '@front/ui/components/form/period'
import { Loader } from '@front/ui/components/layout/loader'
import { Currency } from '@shared/enum/Currency'
import { GroupBy } from '@shared/enum/GroupBy'

import { Header } from '../../components/header'
import { CurrencySwitch } from './components/currency-switch'

const groupBy = GroupBy.Year

interface Props {
  className?: string
}

export const Stats = ({ className }: Props) => {
  const firstTransactionDate = useMappedState(getFirstTransactionDate)
  const fetching = useMappedState(getStatsFetchingStatus)
  const dispatch = useThunk()

  const [from, setFrom] = useState(startOfYear(firstTransactionDate))
  const [to, setTo] = useState(endOfYear(new Date()))
  const [currency, setCurrency] = useState(Currency.USD)

  const [actualFrom, actualTo] = useMemo(
    () => [startOfYear(from), endOfYear(to)],
    [from, to],
  )

  const statsSelector = useCallback(
    getStats(actualFrom, actualTo, groupBy, currency),
    [actualFrom, actualTo, currency],
  )
  const stats = useMappedState(statsSelector)

  useEffect(
    () => {
      dispatch(fetchStats(actualFrom, actualTo, groupBy, currency))
    },
    [actualFrom, actualTo, currency],
  )

  return (
    <section className={className}>
      <Header title="Stats">
        <Period start={from} updateStart={setFrom} end={to} updateEnd={setTo} />
        <CurrencySwitch currency={currency} updateCurrency={setCurrency} />
      </Header>

      <Loader status={fetching}>
        {stats.nonEmpty() && (
          <BarChart
            displayValue={displayMoney(currency)}
            dataSets={stats.get().map(({ start, income, outcome }) => ({
              name: format(start, 'YYYY'),
              data: {
                income,
                outcome,
              },
            }))}
          />
        )}
      </Loader>
    </section>
  )
}
