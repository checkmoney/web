import { fetchOrFail } from '&front/domain/store';

import { actions } from '../reducer/tips';
import { disableTipsRequest } from '../api/disableTipsRequest';

export const disableTips = (tokens: string[]) =>
  fetchOrFail(undefined, async (dispatch, getApi) => {
    dispatch(actions.data.removeTips(tokens));

    await disableTipsRequest(getApi())({ tokens });
  });
