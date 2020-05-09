import { fetchOrFail } from '&front/domain/store';
import { GoogleProfile } from '&shared/models/user/external/GoogleProfile';
import { TokenModel } from '&shared/models/user/TokenModel';

import { setCookie } from '../helpers/setCookie';
import { actions as dataActions } from '../reducer/data';
import { actions as signInActions } from '../reducer/signIn';

const { setToken } = dataActions;

export const signInGoogle = (profile: GoogleProfile) =>
  fetchOrFail(signInActions, async (dispatch, getApi) => {
    const { token } = await getApi()
      .client.post('user/auth/google', profile)
      .then(response => response.data as TokenModel);

    setCookie(token);

    dispatch(setToken(token));
  });
