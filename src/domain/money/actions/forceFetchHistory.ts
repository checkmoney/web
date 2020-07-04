import { fetchOrFail } from '&front/domain/store';
import { PeriodType } from '&front/shared';

import { fetchHistoryRequest } from '../api/fetchHistoryRequest';
import { actions } from '../reducer/history';

export const forceFetchHistory = (from: Date, to: Date, groupBy: PeriodType) =>
  fetchOrFail(undefined, async (dispatch, getApi) => {
    const history = await fetchHistoryRequest(getApi())(from, to, groupBy);

    dispatch(actions.data.addHistory({ from, to, groupBy }, history));
  });
