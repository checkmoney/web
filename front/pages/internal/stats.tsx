import * as React from 'react'
import { startOfMonth, endOfMonth } from 'date-fns'

import { AppContext } from '@front/domain/AppContext'
import { fetchFirstTransactionDate } from '@front/domain/money/actions/fetchFirstTransactionDate'
import { Statistics } from '@front/features/statistics'
import { wantUTC } from '@front/helpers/wantUTC'
import { Currency } from '@shared/enum/Currency'
import { fetchStatsSources } from '@front/domain/money/actions/fetchStatsSources'
import { fetchStatsCategories } from '@front/domain/money/actions/fetchStatsCategories'
import { fetchStatsAverage } from '@front/domain/money/actions/fetchStatsAverage'
import { fetchStatsDynamics } from '@front/domain/money/actions/fetchStatsDynamics'
import { GroupBy } from '@shared/enum/GroupBy'

export default class StatsPage extends React.Component {
  public static isSecure = true

  public static async getInitialProps({ reduxStore }: AppContext) {
    const from = wantUTC(startOfMonth)(new Date())
    const to = wantUTC(endOfMonth)(new Date())
    const currency = Currency.USD

    await Promise.all([
      reduxStore.dispatch(fetchFirstTransactionDate() as any),
      reduxStore.dispatch(fetchStatsSources(from, to, currency) as any),
      reduxStore.dispatch(fetchStatsCategories(from, to, currency) as any),
      reduxStore.dispatch(fetchStatsAverage(currency, GroupBy.Month) as any),
      reduxStore.dispatch(fetchStatsDynamics(
        from,
        to,
        GroupBy.Month,
        currency,
      ) as any),
    ])

    return {}
  }

  public render() {
    return <Statistics />
  }
}
