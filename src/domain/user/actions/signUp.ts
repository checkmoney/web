import { fetchOrFail } from '&front/domain/store';
import { updateToken } from '&front/app/auth/auth.utils';

import { signUp as signUpRequest } from '../api/signUp';
import { actions as signUpActions } from '../reducer/signUp';

export const signUp = (login: string, password: string) =>
  fetchOrFail(signUpActions, async (_, getApi) => {
    const { token } = await signUpRequest(getApi())(login, password);

    updateToken(token);
  });
