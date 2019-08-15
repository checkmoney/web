import { fetchOrFail } from '&front/domain/store';

import { signIn as signInRequest } from '../api/signIn';
import { setCookie } from '../helpers/setCookie';
import { actions as dataActions } from '../reducer/data';
import { actions as signInActions } from '../reducer/signIn';

const { setToken } = dataActions;

export const signIn = (login: string, password: string) =>
  fetchOrFail(signInActions, async (dispatch, getApi) => {
    const { token } = await signInRequest(getApi())(login, password);

    setCookie(token);

    dispatch(setToken(token));
  });
