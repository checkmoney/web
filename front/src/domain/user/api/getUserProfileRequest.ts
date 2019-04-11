import { Api } from '@front/domain/api'
import { ProfileModel } from '@shared/models/user/ProfileModel'

export const getUserProfileRequest = (api: Api) => (): Promise<ProfileModel> =>
  api.client.get(`user/profile/`).then(response => response.data)
