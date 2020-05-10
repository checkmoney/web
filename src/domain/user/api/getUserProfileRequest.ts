import { Api } from '&front/domain/api';
import { actualizeStore } from '&front/domain/store/utils/actualizeStore';
import { ProfileModel } from '&shared/models/user/ProfileModel';

export const getUserProfileRequest = (api: Api) => (): Promise<ProfileModel> =>
  api.client
    .get(`user/profile/`)
    .then((response) => actualizeStore(response.data));
