import * as React from 'react'

import { AppContext } from '@front/domain/AppContext'
import { fetchFirstTransactionDate } from '@front/domain/money/actions/fetchFirstTransactionDate'
import { getDefaultCurrency } from '@front/domain/user/selectors/getDefaultCurrency'
import { GroupBy } from '@shared/enum/GroupBy'
import { createRangeForGroup } from '@front/helpers/createRangeForGroup'
import { getFirstTransactionDate } from '@front/domain/money/selectors/getFirstTransactionDate'
import { Sources } from '@front/features/statistics/features/details/sources'
import { fetchStatsSources } from '@front/domain/money/actions/fetchStatsSources'

interface Query {
  group?: GroupBy
}

export default class SourcesPage extends React.Component<Query> {
  public static isSecure = true

  public static async getInitialProps({
    reduxStore,
    query,
  }: AppContext<Query>) {
    const { group } = query

    await reduxStore.dispatch(fetchFirstTransactionDate() as any)
    const firstTransactionDate = getFirstTransactionDate(reduxStore.getState())

    const { from, to } = !!group
      ? createRangeForGroup(group)
      : {
          from: firstTransactionDate,
          to: new Date(),
        }

    const currency = getDefaultCurrency(reduxStore.getState())

    await reduxStore.dispatch(fetchStatsSources(from, to, currency) as any)

    return { group }
  }

  public render() {
    const { group } = this.props

    return <Sources group={group} />
  }
}
