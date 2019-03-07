import { fetchOrFail } from '@front/domain/fetching-redux'
import { Currency } from '@shared/enum/Currency'
import { GroupBy } from '@shared/enum/GroupBy'

import { fetchStatsRequest } from '../api/fetchStatsRequest'
import { actions as dataActions } from '../reducer/statsDynamics'
import { actions as statsFetchingActions } from '../reducer/statsDynamicsFetching'
import { getStatsDynamics } from '../selectors/getStatsDynamics'

const { addStats } = dataActions

export const fetchStatsDynamics = (
  from: Date,
  to: Date,
  groupBy: GroupBy,
  currency: Currency,
) =>
  fetchOrFail(statsFetchingActions, async (dispatch, getApi, getState) => {
    const existStats = getStatsDynamics(from, to, groupBy, currency)(getState())

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
