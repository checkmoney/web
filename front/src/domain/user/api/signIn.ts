import { TokenModel } from '@shared/models/user/TokenModel'

import { Api } from '@front/domain/api'

export const signIn = (api: Api) => (
  email: string,
  password: string,
): Promise<TokenModel> =>
  api.client
    .post('user/auth/sign-in', {
      email,
      password,
    })
    .then(response => response.data)
