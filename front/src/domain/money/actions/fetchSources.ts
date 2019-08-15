import { fetchOrFail } from '&front/domain/store';

import { actions } from '../reducer/listSources';
import { fetchSourcesRequest } from '../api/fetchSourcesRequest';

export const fetchSources = () =>
  fetchOrFail(actions.fetching, async (dispatch, getApi) => {
    const sources = await fetchSourcesRequest(getApi())();

    dispatch(actions.data.addSources(sources));
  });
