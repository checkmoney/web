import { Api } from '&front/domain/api';
import { TokenModel } from '&shared/models/user/TokenModel';

export const signIn = (api: Api) => (
  email: string,
  password: string,
): Promise<TokenModel> =>
  api.client
    .post('user/auth/sign-in', {
      email,
      password,
    })
    .then((response) => response.data);
