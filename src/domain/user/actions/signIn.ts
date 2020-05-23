import { fetchOrFail } from '&front/domain/store';
import { updateToken } from '&front/app/auth/auth.utils';

import { signIn as signInRequest } from '../api/signIn';
import { actions as signInActions } from '../reducer/signIn';

export const signIn = (login: string, password: string) =>
  fetchOrFail(signInActions, async (_, getApi) => {
    const { token } = await signInRequest(getApi())(login, password);

    updateToken(token);
  });
