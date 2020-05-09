import { fetchOrFail } from '&front/domain/store';

import { fetchSourcesRequest } from '../api/fetchSourcesRequest';
import { actions } from '../reducer/listSources';

export const fetchSources = () =>
  fetchOrFail(actions.fetching, async (dispatch, getApi) => {
    const sources = await fetchSourcesRequest(getApi())();

    dispatch(actions.data.addSources(sources));
  });
