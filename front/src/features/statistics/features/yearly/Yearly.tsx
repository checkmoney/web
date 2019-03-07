import { endOfYear, format, startOfYear } from 'date-fns'
import { useMemo } from 'react'
import { useMappedState } from 'redux-react-hook'
import { useMedia } from 'use-media'

import { fetchStatsDynamics } from '@front/domain/money/actions/fetchStatsDynamics'
import { getFirstTransactionDate } from '@front/domain/money/selectors/getFirstTransactionDate'
import { getStatsDynamics } from '@front/domain/money/selectors/getStatsDynamics'
import { getStatsFetchingStatus } from '@front/domain/money/selectors/getStatsFetchingStatus'
import { displayMoney } from '@shared/helpers/displayMoney'
import { BarChart } from '@front/ui/components/chart/bar-chart'
import { Loader } from '@front/ui/components/layout/loader'
import { Currency } from '@shared/enum/Currency'
import { GroupBy } from '@shared/enum/GroupBy'
import { ControlHeader } from '@front/ui/components/controls/control-header'
import { useMemoState } from '@front/domain/store'
import { wantUTC } from '@front/helpers/wantUTC'

const groupBy = GroupBy.Year

interface Props {
  className?: string
  currency: Currency
}

export const Yearly = ({ className, currency }: Props) => {
  const firstTransactionDate = useMappedState(getFirstTransactionDate)
  const fetching = useMappedState(getStatsFetchingStatus)
  const isSmall = useMedia({ maxWidth: 768 })

  const from = useMemo(() => wantUTC(startOfYear)(firstTransactionDate), [
    firstTransactionDate,
  ])
  const to = useMemo(() => wantUTC(endOfYear)(new Date()), [])

  const stats = useMemoState(
    () => getStatsDynamics(from, to, groupBy, currency),
    () => fetchStatsDynamics(from, to, groupBy, currency),
    [from, currency],
  )

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
