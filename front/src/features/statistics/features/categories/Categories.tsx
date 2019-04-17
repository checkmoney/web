import { useMappedState } from 'redux-react-hook'
import { sortBy, take } from 'lodash'
import { useMemo } from 'react'

import { Currency } from '@shared/enum/Currency'
import { displayMoney } from '@shared/helpers/displayMoney'
import { GroupBy } from '@shared/enum/GroupBy'
import { getStatsCategoriesFetchingStatus } from '@front/domain/money/selectors/getStatsCategoriesFetchingStatus'
import { useMemoState } from '@front/domain/store'
import { getStatsCategories } from '@front/domain/money/selectors/getStatsCategories'
import { fetchStatsCategories } from '@front/domain/money/actions/fetchStatsCategories'
import { LoaderTable } from '@front/ui/components/layout/loader-table'
import { Button, ButtonType } from '@front/ui/components/form/button'
import { pushRoute } from '@front/features/routing'
import { createRangeForGroup } from '@front/helpers/createRangeForGroup'

interface Props {
  className?: string
  currency: Currency
  group: GroupBy.Month | GroupBy.Year
  widthPercent: number
  maxLength: number
}

export const Categories = ({
  className,
  currency,
  group,
  widthPercent,
  maxLength,
}: Props) => {
  const columns = useMemo(
    () => ({
      category: {
        title: 'Category',
        widthPercent,
      },
      outcome: {
        title: 'Amount',
        transform: displayMoney(currency),
      },
    }),
    [currency],
  )

  const fetching = useMappedState(getStatsCategoriesFetchingStatus)

  const { from, to } = useMemo(() => createRangeForGroup(group), [group])

  const stats = useMemoState(
    () => getStatsCategories(from, to, currency),
    () => fetchStatsCategories(from, to, currency),
    [from, to, currency],
  )

  // sort by `income` and take `maxLength` top groups
  const preparedData = useMemo(
    () => stats.map(s => take(sortBy(s, t => -t.outcome), maxLength)),
    [stats, maxLength],
  )

  return (
    <LoaderTable
      title={`What did you spend money on this ${group}`}
      columns={columns}
      data={preparedData}
      fetching={fetching}
      expectedRows={maxLength}
      className={className}
      hideHeader
      footer={
        <Button
          type={ButtonType.Text}
          onClick={() => pushRoute(`/app/stats/categories/${group}`)}
        >
          Details
        </Button>
      }
    />
  )
}
