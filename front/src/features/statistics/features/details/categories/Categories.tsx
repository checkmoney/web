import { GroupBy } from '@shared/enum/GroupBy'
import { getStatsCategories } from '@front/domain/money/selectors/getStatsCategories'
import { fetchStatsCategories } from '@front/domain/money/actions/fetchStatsCategories'

import { Detail } from '../generic'

interface Props {
  group?: GroupBy
}

export const Categories = ({ group }: Props) => {
  return (
    <Detail
      detailType="categories"
      fetchData={fetchStatsCategories}
      getData={getStatsCategories}
      toAmount={({ outcome }) => outcome}
      toData={({ category, outcome }) => ({
        name: category,
        data: outcome,
      })}
      group={group}
    />
  )
}
