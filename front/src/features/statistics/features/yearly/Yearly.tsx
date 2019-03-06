import { endOfYear, format, startOfYear } from 'date-fns'
import { useEffect, useMemo } from 'react'
import { useMappedState } from 'redux-react-hook'
import { useMedia } from 'use-media'

import { fetchStats } from '@front/domain/money/actions/fetchStats'
import { getFirstTransactionDate } from '@front/domain/money/selectors/getFirstTransactionDate'
import { getStats } from '@front/domain/money/selectors/getStats'
import { getStatsFetchingStatus } from '@front/domain/money/selectors/getStatsFetchingStatus'
import { useThunk } from '@front/domain/store'
import { displayMoney } from '@shared/helpers/displayMoney'
import { BarChart } from '@front/ui/components/chart/bar-chart'
import { Loader } from '@front/ui/components/layout/loader'
import { Currency } from '@shared/enum/Currency'
import { GroupBy } from '@shared/enum/GroupBy'
import { ControlHeader } from '@front/ui/components/controls/control-header'
import { useMemoState } from '@front/domain/store'

const groupBy = GroupBy.Year

interface Props {
  className?: string
  currency: Currency
}

export const Yearly = ({ className, currency }: Props) => {
  const firstTransactionDate = useMappedState(getFirstTransactionDate)
  const fetching = useMappedState(getStatsFetchingStatus)
  const dispatch = useThunk()
  const isSmall = useMedia({ maxWidth: 768 })

  const from = useMemo(() => startOfYear(firstTransactionDate), [
    firstTransactionDate,
  ])
  const to = useMemo(() => endOfYear(new Date()), [])

  const stats = useMemoState(() => getStats(from, to, groupBy, currency), [
    from,
    currency,
  ])

  useEffect(() => {
    dispatch(fetchStats(from, to, groupBy, currency))
  }, [from, currency, stats.isEmpty()])

  return (
    <section className={className}>
      <ControlHeader title="Yearly dynamics" />
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
            fitToContainer={isSmall}
          />
        )}
      </Loader>
    </section>
  )
}
