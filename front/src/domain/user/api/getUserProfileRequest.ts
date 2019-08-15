import { Api } from '&front/domain/api';
import { ProfileModel } from '&shared/models/user/ProfileModel';
import { actualizeStore } from '&front/domain/store/utils/actualizeStore';

export const getUserProfileRequest = (api: Api) => (): Promise<ProfileModel> =>
  api.client
    .get(`user/profile/`)
    .then(response => actualizeStore(response.data));
