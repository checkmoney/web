import { useMappedState } from 'redux-react-hook'
import { useMemo } from 'react'

import { GroupBy } from '@shared/enum/GroupBy'
import { Container } from '@front/ui/components/layout/container'
import { getStatsCategoriesFetchingStatus } from '@front/domain/money/selectors/getStatsCategoriesFetchingStatus'
import { createRangeForGroup } from '@front/helpers/createRangeForGroup'
import { useMemoState } from '@front/domain/store'
import { getStatsCategories } from '@front/domain/money/selectors/getStatsCategories'
import { fetchStatsCategories } from '@front/domain/money/actions/fetchStatsCategories'
import { getDefaultCurrency } from '@front/domain/user/selectors/getDefaultCurrency'
import { PageHeader } from '@front/ui/components/layout/page-header'
import { Loader } from '@front/ui/components/layout/loader'
import { PieChart } from '@front/ui/components/chart/pie-chart'

import { pushRoute } from '../routing'
import { displayMoney } from '@shared/helpers/displayMoney'
import useMedia from 'use-media'

interface Props {
  group: GroupBy
}

export const Categories = ({ group }: Props) => {
  const fetching = useMappedState(getStatsCategoriesFetchingStatus)
  const currency = useMappedState(getDefaultCurrency)
  const isSmall = useMedia({ maxWidth: 768 })

  const { from, to } = useMemo(() => createRangeForGroup(group), [group])

  const stats = useMemoState(
    () => getStatsCategories(from, to, currency),
    () => fetchStatsCategories(from, to, currency),
    [from, to, currency],
  )

  return (
    <Container>
      <PageHeader title="Categories" onBack={() => pushRoute('/app/stats')} />

      <Loader status={fetching}>
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
      </Loader>
    </Container>
  )
}
