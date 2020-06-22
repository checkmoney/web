import { fetchOrFail } from '&front/domain/store';
import { GoogleProfile } from '&front/models/user/external/GoogleProfile';
import { TokenModel } from '&front/models/user/TokenModel';
import { updateToken } from '&front/app/auth/auth.utils';

import { actions as signInActions } from '../reducer/signIn';

export const signInGoogle = (profile: GoogleProfile) =>
  fetchOrFail(signInActions, async (_, getApi) => {
    const { token } = await getApi()
      .client.post('user/auth/google', profile)
      .then((response) => response.data as TokenModel);

    updateToken(token);
  });
