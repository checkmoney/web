import { fetchOrFail } from '@front/domain/store/fetchingRedux/fetchOrFail'
import { GroupBy } from '@shared/enum/GroupBy'

import { fetchHistoryRequest } from '../api/fetchHistoryRequest'
import { actions as dataActions } from '../reducer/history'

const { addHistory } = dataActions

export const forceFetchHistory = (from: Date, to: Date, groupBy: GroupBy) =>
  fetchOrFail(undefined, async (dispatch, getApi) => {
    const history = await fetchHistoryRequest(getApi())(from, to, groupBy)

    dispatch(addHistory({ from, to, groupBy }, history))
  })
