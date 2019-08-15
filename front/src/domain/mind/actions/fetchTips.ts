import { fetchOrFail } from '&front/domain/store';

import { fetchTipsRequest } from '../api/fetchTipsRequest';
import { actions } from '../reducer/tips';

export const fetchTips = () =>
  fetchOrFail(actions.fetching, async (dispatch, getApi) => {
    const tips = await fetchTipsRequest(getApi())();

    dispatch(actions.data.addTips(tips));
  });
