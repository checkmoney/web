import * as React from 'react'

import { AppContext } from '@front/domain/AppContext'
import { fetchFirstTransactionDate } from '@front/domain/money/actions/fetchFirstTransactionDate'
import { fetchStatsCategories } from '@front/domain/money/actions/fetchStatsCategories'
import { getDefaultCurrency } from '@front/domain/user/selectors/getDefaultCurrency'
import { Categories } from '@front/features/categories'
import { GroupBy } from '@shared/enum/GroupBy'
import { createRangeForGroup } from '@front/helpers/createRangeForGroup'

interface Query {
  group: GroupBy
}

export default class CateogiesPage extends React.Component<Query> {
  public static isSecure = true

  public static async getInitialProps({
    reduxStore,
    query,
  }: AppContext<Query>) {
    const { group } = query
    const { from, to } = createRangeForGroup(group)

    const currency = getDefaultCurrency(reduxStore.getState())

    await Promise.all([
      reduxStore.dispatch(fetchFirstTransactionDate() as any),
      reduxStore.dispatch(fetchStatsCategories(from, to, currency) as any),
    ])

    return { group }
  }

  public render() {
    const { group } = this.props

    return <Categories group={group} />
  }
}
