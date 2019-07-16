import { fetchOrFail } from '&front/domain/store'

import { actions } from '../reducer/tips'
import { fetchTipsRequest } from '../api/fetchTipsRequest'

export const fetchTips = () =>
  fetchOrFail(actions.fetching, async (dispatch, getApi) => {
    const tips = await fetchTipsRequest(getApi())()

    dispatch(actions.data.addTips(tips))
  })
