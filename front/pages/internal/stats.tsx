import * as React from 'react'
import { startOfYear, endOfYear } from 'date-fns'

import { AppContext } from '@front/domain/AppContext'
import { fetchFirstTransactionDate } from '@front/domain/money/actions/fetchFirstTransactionDate'
import { Statistics } from '@front/features/statistics'
import { fetchStats } from '@front/domain/money/actions/fetchStats'
import { getFirstTransactionDate } from '@front/domain/money/selectors/getFirstTransactionDate'
import { GroupBy } from '@shared/enum/GroupBy'
import { Currency } from '@shared/enum/Currency'

export default class StatsPage extends React.Component {
  public static isSecure = true

  public static async getInitialProps({ reduxStore }: AppContext) {
    await reduxStore.dispatch(fetchFirstTransactionDate() as any)

    const defaultFrom = startOfYear(
      getFirstTransactionDate(reduxStore.getState()),
    )
    const defaultTo = endOfYear(new Date())
    await reduxStore.dispatch(fetchStats(
      defaultFrom,
      defaultTo,
      GroupBy.Month,
      Currency.USD,
    ) as any)

    return {}
  }

  public render() {
    return <Statistics />
  }
}
