import { fetchOrFail } from '@front/domain/store/fetchingRedux/fetchOrFail'
import { GroupBy } from '@shared/enum/GroupBy'

import { fetchHistoryRequest } from '../api/fetchHistoryRequest'
import { actions as dataActions } from '../reducer/history'
import { actions as historyFetchingActions } from '../reducer/historyFetching'
import { getHistory } from '../selectors/getHistory'

const { addHistory } = dataActions

export const fetchHistory = (from: Date, to: Date, groupBy: GroupBy) =>
  fetchOrFail(historyFetchingActions, async (dispatch, getApi, getState) => {
    const existHistory = getHistory(from, to, groupBy)(getState())

    if (existHistory.isEmpty()) {
      const history = await fetchHistoryRequest(getApi())(from, to, groupBy)

      dispatch(addHistory({ from, to, groupBy }, history))
    }
  })
