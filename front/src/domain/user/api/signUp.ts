import { Api } from '&front/domain/api';
import { TokenModel } from '&shared/models/user/TokenModel';

export const signUp = (api: Api) => (
  email: string,
  password: string,
): Promise<TokenModel> =>
  api.client
    .post('user/auth/sign-up', {
      email,
      password,
    })
    .then(response => response.data);
