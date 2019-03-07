import { fetchOrFail } from '@front/domain/store'
import { Currency } from '@shared/enum/Currency'
import { GroupBy } from '@shared/enum/GroupBy'

import { fetchStatsRequest } from '../api/fetchStatsRequest'
import { actions } from '../reducer/statsDynamics'

export const forceFetchStatsDynamics = (
  from: Date,
  to: Date,
  groupBy: GroupBy,
  currency: Currency,
) =>
  fetchOrFail(undefined, async (dispatch, getApi) => {
    const stats = await fetchStatsRequest(getApi())(from, to, groupBy, currency)

    dispatch(actions.data.addStats({ from, to, groupBy, currency }, stats))
  })
