import { fetchOrFail } from '&front/domain/store';

import { resetCookie } from '../helpers/resetCookie';
import { actions as dataActions } from '../reducer/data';

const { resetToken } = dataActions;

export const signOut = () =>
  fetchOrFail(undefined, async dispatch => {
    resetCookie();

    dispatch(resetToken());
  });
