import { fetchOrFail } from '&front/domain/store';

import { disableTipsRequest } from '../api/disableTipsRequest';
import { actions } from '../reducer/tips';

export const disableTips = (tokens: string[]) =>
  fetchOrFail(undefined, async (dispatch, getApi) => {
    dispatch(actions.data.removeTips(tokens));

    await disableTipsRequest(getApi())({ tokens });
  });
