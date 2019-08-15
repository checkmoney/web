import { fetchOrFail } from '&front/domain/store';
import { GroupBy } from '&shared/enum/GroupBy';

import { fetchHistoryRequest } from '../api/fetchHistoryRequest';
import { actions } from '../reducer/history';
import { getHistory } from '../selectors/getHistory';

export const fetchHistory = (from: Date, to: Date, groupBy: GroupBy) =>
  fetchOrFail(actions.fetching, async (dispatch, getApi, getState) => {
    const existHistory = getHistory(from, to, groupBy)(getState());

    if (existHistory.isEmpty()) {
      const history = await fetchHistoryRequest(getApi())(from, to, groupBy);

      dispatch(actions.data.addHistory({ from, to, groupBy }, history));
    }
  });
