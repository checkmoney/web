import { fetchOrFail } from '@front/domain/store'

import { setWeekStartRequest } from '../api/setWeekStartRequest'
import { actions } from '../reducer/profile'
import { fetchUserProfile } from './fetchUserProfile'

export const setWeekStart = (onMonday: boolean) => {
  return fetchOrFail(actions.fetching, async (dispatch, getApi) => {
    await setWeekStartRequest(getApi())(onMonday)

    await dispatch(fetchUserProfile())
  })
}
