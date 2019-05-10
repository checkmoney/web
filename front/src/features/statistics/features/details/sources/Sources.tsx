import { GroupBy } from '@shared/enum/GroupBy'
import { fetchStatsSources } from '@front/domain/money/actions/fetchStatsSources'
import { getStatsSources } from '@front/domain/money/selectors/getStatsSources'

import { Detail } from '../generic'

interface Props {
  group?: GroupBy
}

export const Sources = ({ group }: Props) => {
  return (
    <Detail
      detailType="sources"
      fetchData={fetchStatsSources}
      getData={getStatsSources}
      toAmount={({ income }) => income}
      toData={({ source, income }) => ({
        name: source,
        data: income,
      })}
      group={group}
    />
  )
}
