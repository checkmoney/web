import { fetchOrFail } from '$front/domain/store'
import { Currency } from '$shared/enum/Currency'

import { actions } from '../reducer/statsSources'
import { getStatsSources } from '../selectors/getStatsSources'
import { fetchStatsSourcesRequest } from '../api/fetchStatsSourcesRequest'

export const fetchStatsSources = (from: Date, to: Date, currency: Currency) =>
  fetchOrFail(actions.fetching, async (dispatch, getApi, getState) => {
    const existStats = getStatsSources(from, to, currency)(getState())

    if (existStats.isEmpty()) {
      const stats = await fetchStatsSourcesRequest(getApi())(from, to, currency)

      dispatch(actions.data.addStats({ from, to, currency }, stats))
    }
  })
