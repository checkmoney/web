import { fetchOrFail } from '@front/domain/fetching-redux'
import { Currency } from '@shared/enum/Currency'
import { GroupBy } from '@shared/enum/GroupBy'

import { fetchStatsRequest } from '../api/fetchStatsRequest'
import { actions as dataActions } from '../reducer/stats'

const { addStats } = dataActions

export const forceFetchStats = (
  from: Date,
  to: Date,
  groupBy: GroupBy,
  currency: Currency,
) =>
  fetchOrFail(undefined, async (dispatch, getApi) => {
    const stats = await fetchStatsRequest(getApi())(from, to, groupBy, currency)

    dispatch(addStats({ from, to, groupBy, currency }, stats))
  })
