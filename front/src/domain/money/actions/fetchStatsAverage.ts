import { fetchOrFail } from '$front/domain/store'
import { Currency } from '$shared/enum/Currency'

import { actions } from '../reducer/statsAverage'
import { getStatsAverage } from '../selectors/getStatsAverage'
import { fetchStatsAverageRequest } from '../api/fetchStatsAverageRequest'
import { GroupBy } from '$shared/enum/GroupBy'

export const fetchStatsAverage = (currency: Currency, groupBy: GroupBy) =>
  fetchOrFail(actions.fetching, async (dispatch, getApi, getState) => {
    const existStats = getStatsAverage(currency, groupBy)(getState())

    if (existStats.isEmpty()) {
      const stats = await fetchStatsAverageRequest(getApi())(currency, groupBy)

      dispatch(actions.data.addStats({ currency, groupBy }, stats))
    }
  })
