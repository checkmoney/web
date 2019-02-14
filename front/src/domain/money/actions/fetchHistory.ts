import { fetchOrFail } from '@front/domain/store/fetchingRedux/fetchOrFail'
import { GroupBy } from '@shared/enum/GroupBy'

import { fetchHistoryRequest } from '../api/fetchHistoryRequest'
import { createHistoryKey } from '../helpers/createHistoryKey'
import { actions as dataActions } from '../reducer/history'
import { actions as historyFetchingActions } from '../reducer/historyFetching'

const { addHistory } = dataActions

export const fetchHistory = (from: Date, to: Date, groupBy: GroupBy) =>
  fetchOrFail(historyFetchingActions, async (dispatch, getApi) => {
    const history = await fetchHistoryRequest(getApi())(from, to, groupBy)

    dispatch(addHistory(createHistoryKey(from, to, groupBy), history))
  })
