import { fetchOrFail } from '@front/domain/store/fetchingRedux/fetchOrFail'
import { Currency } from '@shared/enum/Currency'
import { GroupBy } from '@shared/enum/GroupBy'

import { fetchStatsRequest } from '../api/fetchStatsRequest'
import { actions as dataActions } from '../reducer/stats'
import { actions as statsFetchingActions } from '../reducer/statsFetching'
import { getStats } from '../selectors/getStats'

const { addStats } = dataActions

export const fetchStats = (
  from: Date,
  to: Date,
  groupBy: GroupBy,
  currency: Currency,
) =>
  fetchOrFail(statsFetchingActions, async (dispatch, getApi, getState) => {
    const existStats = getStats(from, to, groupBy, currency)(getState())

    if (existStats.isEmpty()) {
      const stats = await fetchStatsRequest(getApi())(
        from,
        to,
        groupBy,
        currency,
      )

      dispatch(addStats({ from, to, groupBy, currency }, stats))
    }
  })
