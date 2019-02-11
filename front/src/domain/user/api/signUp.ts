import { TokenModel } from '@shared/models/user/TokenModel'

import { Api } from '@front/domain/api/Api'

export const signUp = (api: Api) => (
  email: string,
  password: string,
): Promise<TokenModel> =>
  api.client
    .post('user/auth/sign-up', {
      email,
      password,
    })
    .then(response => response.data)
