import { fetchOrFail } from '&front/domain/store';

import { actions as dataActions } from '../reducer/data';
import { resetCookie } from '../helpers/resetCookie';

const { resetToken } = dataActions;

export const signOut = () =>
  fetchOrFail(undefined, async dispatch => {
    resetCookie();

    dispatch(resetToken());
  });
