import { fetchOrFail } from '$front/domain/store'

import { getUserProfileRequest } from '../api/getUserProfileRequest'
import { actions } from '../reducer/profile'

export const fetchUserProfile = () => {
  return fetchOrFail(actions.fetching, async (dispatch, getApi) => {
    // TODO: проверка чтобы не фетчил каждый раз
    // добавить поле userFetchingOnce
    const profile = await getUserProfileRequest(getApi())()
    dispatch(actions.data.setProfile(profile))
  })
}
