import { fetchOrFail } from '@front/domain/store'
import { Currency } from '@shared/enum/Currency'
import { GroupBy } from '@shared/enum/GroupBy'

import { fetchStatsRequest } from '../api/fetchStatsRequest'
import { actions } from '../reducer/statsDynamics'
import { getStatsDynamics } from '../selectors/getStatsDynamics'

export const fetchStatsDynamics = (
  from: Date,
  to: Date,
  groupBy: GroupBy,
  currency: Currency,
) =>
  fetchOrFail(actions.fetching, async (dispatch, getApi, getState) => {
    const existStats = getStatsDynamics(from, to, groupBy, currency)(getState())

    if (existStats.isEmpty()) {
      const stats = await fetchStatsRequest(getApi())(
        from,
        to,
        groupBy,
        currency,
      )

      dispatch(actions.data.addStats({ from, to, groupBy, currency }, stats))
    }
  })
