import { endOfYear, format, startOfYear } from 'date-fns'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useMappedState } from 'redux-react-hook'

import { fetchStats } from '@front/domain/money/actions/fetchStats'
import { getFirstTransactionDate } from '@front/domain/money/selectors/getFirstTransactionDate'
import { getStats } from '@front/domain/money/selectors/getStats'
import { getStatsFetchingStatus } from '@front/domain/money/selectors/getStatsFetchingStatus'
import { displayMoney } from '@front/helpers/displayMoney'
import { Loader } from '@front/ui/molecules/loader'
import { BarChart } from '@front/ui/organisms/bar-char'
import { Period } from '@front/ui/organisms/period'
import { Currency } from '@shared/enum/Currency'
import { GroupBy } from '@shared/enum/GroupBy'

import { Header } from '../../components/Header/Header'
import { CurrencySwitch } from './organisms/CurrencySwitch'

const groupBy = GroupBy.Year

interface Props {
  className?: string
}

export const Stats = ({ className }: Props) => {
  const firstTransactionDate = useMappedState(getFirstTransactionDate)
  const fetching = useMappedState(getStatsFetchingStatus)
  const dispatch = useDispatch()

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
      dispatch(fetchStats(actualFrom, actualTo, groupBy, currency) as any)
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
