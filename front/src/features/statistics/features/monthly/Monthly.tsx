import { endOfYear, format, startOfYear } from 'date-fns'
import { useEffect } from 'react'
import { useMappedState } from 'redux-react-hook'

import { fetchStats } from '@front/domain/money/actions/fetchStats'
import { getStats } from '@front/domain/money/selectors/getStats'
import { getStatsFetchingStatus } from '@front/domain/money/selectors/getStatsFetchingStatus'
import { useThunk, useMemoState } from '@front/domain/store'
import { displayMoney } from '@shared/helpers/displayMoney'
import { BarChart } from '@front/ui/components/chart/bar-chart'
import { Period } from '@front/ui/components/form/period'
import { Loader } from '@front/ui/components/layout/loader'
import { Currency } from '@shared/enum/Currency'
import { GroupBy } from '@shared/enum/GroupBy'
import { ControlHeader } from '@front/ui/components/controls/control-header'
import { useActualDateRange } from '@front/ui/hooks/useActualDateRange'

const groupBy = GroupBy.Month

interface Props {
  className?: string
  currency: Currency
}

export const Monthly = ({ className, currency }: Props) => {
  const fetching = useMappedState(getStatsFetchingStatus)
  const dispatch = useThunk()

  // TODO: nache to select year (only year)
  const { from, setFrom, to, setTo, actualFrom, actualTo } = useActualDateRange(
    new Date(),
    new Date(),
    startOfYear,
    endOfYear,
  )

  const stats = useMemoState(
    () => getStats(actualFrom, actualTo, groupBy, currency),
    [actualFrom, actualTo, currency],
  )

  useEffect(() => {
    dispatch(fetchStats(actualFrom, actualTo, groupBy, currency))
  }, [actualFrom, actualTo, currency])

  return (
    <section className={className}>
      <ControlHeader title="Monthly">
        <Period start={from} updateStart={setFrom} end={to} updateEnd={setTo} />
      </ControlHeader>

      <Loader status={fetching}>
        {stats.nonEmpty() && (
          <BarChart
            displayValue={displayMoney(currency)}
            dataSets={stats.get().map(({ start, income, outcome }) => ({
              name: format(start, 'MMMM'),
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
