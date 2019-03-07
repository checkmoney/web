import { fetchOrFail } from '@front/domain/fetching-redux'

import { getHistoryCachedPeriods } from '../selectors/getHistoryCachedPeriods'
import { getStatsCachedPeriods } from '../selectors/getStatsCachedPeriods'
import { fetchFirstTransactionDate } from './fetchFirstTransactionDate'
import { forceFetchHistory } from './forceFetchHistory'
import { forceFetchStatsDynamics } from './forceFetchStatsDynamics'

export const refetchData = () =>
  fetchOrFail(undefined, async (dispatch, _, getState) => {
    const historyCachedPeriods = getHistoryCachedPeriods(getState())
    const statsCachedPeriods = getStatsCachedPeriods(getState())

    await Promise.all([
      dispatch(fetchFirstTransactionDate()),
      ...historyCachedPeriods.map(({ from, to, groupBy }) =>
        dispatch(forceFetchHistory(from, to, groupBy)),
      ),
      ...statsCachedPeriods.map(({ from, to, groupBy, currency }) =>
        dispatch(forceFetchStatsDynamics(from, to, groupBy, currency)),
      ),
    ])
  })
