import { endOfYear, format, startOfYear } from 'date-fns'
import { useState } from 'react'
import { useMappedState } from 'redux-react-hook'

import { fetchStatsDynamics } from '@front/domain/money/actions/fetchStatsDynamics'
import { getFirstTransactionDate } from '@front/domain/money/selectors/getFirstTransactionDate'
import { getStatsDynamics } from '@front/domain/money/selectors/getStatsDynamics'
import { getStatsDynamicsFetchingStatus } from '@front/domain/money/selectors/getStatsDynamicsFetchingStatus'
import { useMemoState } from '@front/domain/store'
import { displayMoney } from '@shared/helpers/displayMoney'
import { BarChart } from '@front/ui/components/chart/bar-chart'
import { Period } from '@front/ui/components/form/period'
import { Loader } from '@front/ui/components/layout/loader'
import { Currency } from '@shared/enum/Currency'
import { GroupBy } from '@shared/enum/GroupBy'
import { ControlHeader } from '@front/ui/components/controls/control-header'
import { CurrencySwitch } from '@front/ui/components/controls/currency-switch'
import { useActualDateRange } from '@front/ui/hooks/useActualDateRange'
import { wantUTC } from '@front/helpers/wantUTC'

const groupBy = GroupBy.Year

interface Props {
  className?: string
}

export const Stats = ({ className }: Props) => {
  const firstTransactionDate = useMappedState(getFirstTransactionDate)
  const fetching = useMappedState(getStatsDynamicsFetchingStatus)

  const { from, setFrom, to, setTo, actualFrom, actualTo } = useActualDateRange(
    firstTransactionDate,
    new Date(),
    wantUTC(startOfYear),
    wantUTC(endOfYear),
  )

  const [currency, setCurrency] = useState(Currency.USD)

  const stats = useMemoState(
    () => getStatsDynamics(actualFrom, actualTo, groupBy, currency),
    () => fetchStatsDynamics(actualFrom, actualTo, groupBy, currency),
    [actualFrom, actualTo, currency],
  )

  return (
    <section className={className}>
      <ControlHeader title="Stats">
        <Period start={from} updateStart={setFrom} end={to} updateEnd={setTo} />
        <CurrencySwitch currency={currency} updateCurrency={setCurrency} />
      </ControlHeader>

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
