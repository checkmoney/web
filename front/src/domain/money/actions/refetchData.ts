import { fetchOrFail } from '@front/domain/fetching-redux'

import { getHistoryCachedPeriods } from '../selectors/getHistoryCachedPeriods'
import { getStatsCachedPeriods } from '../selectors/getStatsCachedPeriods'
import { fetchFirstTransactionDate } from './fetchFirstTransactionDate'
import { forceFetchHistory } from './forceFetchHistory'
import { forceFetchStats } from './forceFetchStats'

export const refetchData = () =>
  fetchOrFail(undefined, async (dispatch, _, getState) => {
    const historyCachedPeriods = getHistoryCachedPeriods(getState())
    const statsCachedPeriods = getStatsCachedPeriods(getState())

    await Promise.all([
      dispatch(fetchFirstTransactionDate() as any),
      ...historyCachedPeriods.map(({ from, to, groupBy }) =>
        dispatch(forceFetchHistory(from, to, groupBy) as any),
      ),
      ...statsCachedPeriods.map(({ from, to, groupBy, currency }) =>
        dispatch(forceFetchStats(from, to, groupBy, currency) as any),
      ),
    ])
  })
