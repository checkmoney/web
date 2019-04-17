import useMedia from 'use-media'
import { useMappedState } from 'redux-react-hook'
import { useState } from 'react'

import { GroupBy } from '@shared/enum/GroupBy'
import { Container } from '@front/ui/components/layout/container'
import { getStatsCategoriesFetchingStatus } from '@front/domain/money/selectors/getStatsCategoriesFetchingStatus'
import { useMemoState } from '@front/domain/store'
import { getStatsCategories } from '@front/domain/money/selectors/getStatsCategories'
import { fetchStatsCategories } from '@front/domain/money/actions/fetchStatsCategories'
import { getDefaultCurrency } from '@front/domain/user/selectors/getDefaultCurrency'
import { PageHeader } from '@front/ui/components/layout/page-header'
import { Loader } from '@front/ui/components/layout/loader'
import { displayMoney } from '@shared/helpers/displayMoney'
import { PieChart } from '@front/ui/components/chart/pie-chart'

import { pushRoute } from '../routing'
import { PeriodChooser } from './features/period-chooser'
import { useDateRange } from './helpers/useDateRange'
import * as styles from './Categories.css'
import { GroupChooser } from './features/group-chooser'

interface Props {
  group?: GroupBy
}

export const Categories = ({ group }: Props) => {
  const fetching = useMappedState(getStatsCategoriesFetchingStatus)
  const currency = useMappedState(getDefaultCurrency)
  const isSmall = useMedia({ maxWidth: 768 })

  const [previousPeriodNumber, setPreviousPeriodNumber] = useState(0)

  const { from, to } = useDateRange(previousPeriodNumber, group)

  const stats = useMemoState(
    () => getStatsCategories(from, to, currency),
    () => fetchStatsCategories(from, to, currency),
    [from, to, currency],
  )

  return (
    <Container>
      <PageHeader title="Categories" onBack={() => pushRoute('/app/stats')} />

      <section className={styles.categories}>
        <aside className={styles.aside}>
          <GroupChooser group={group} />
          {group && (
            <PeriodChooser
              setPreviousPeriodNumber={setPreviousPeriodNumber}
              previousPeriodNumber={previousPeriodNumber}
              from={from}
              to={to}
              group={group}
            />
          )}
        </aside>

        <div className={styles.chart}>
          <Loader status={fetching}>
            {stats.nonEmpty() && (
              <PieChart
                dataSets={stats.get().map(({ category, outcome }) => ({
                  name: category,
                  data: outcome,
                }))}
                displayValue={value =>
                  displayMoney(currency)(value, { withPenny: false })
                }
                fitToContainer={isSmall}
              />
            )}
          </Loader>
        </div>
      </section>
    </Container>
  )
}
