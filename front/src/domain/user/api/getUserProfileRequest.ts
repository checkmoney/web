import { Api } from '@front/domain/api'
import { UserProfile } from '../actions/UserProfile'

export const getUserProfileRequest = (api: Api) => (): Promise<UserProfile> =>
  api.client.get(`user/profile/`).then(response => response.data)
