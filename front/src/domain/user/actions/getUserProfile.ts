import { fetchOrFail } from '@front/domain/store'

import { getUserProfileRequest } from '../api/getUserProfileRequest'
import { actions as userActions } from '../reducer/user'

const { getProfile } = userActions.data

export const getUserProfile = () => {
  return fetchOrFail(userActions.fetching, async (dispatch, getApi) => {
    const profile = await getUserProfileRequest(getApi())()
    dispatch(getProfile(profile))
  })
}
