import { fetchOrFail } from '&front/domain/store'
import { GroupBy } from '&shared/enum/GroupBy'

import { fetchHistoryRequest } from '../api/fetchHistoryRequest'
import { actions } from '../reducer/history'

export const forceFetchHistory = (from: Date, to: Date, groupBy: GroupBy) =>
  fetchOrFail(undefined, async (dispatch, getApi) => {
    const history = await fetchHistoryRequest(getApi())(from, to, groupBy)

    dispatch(actions.data.addHistory({ from, to, groupBy }, history))
  })
