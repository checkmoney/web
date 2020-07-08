import { fetchOrFail } from '&front/domain/store';

import { getHistoryCachedPeriods } from '../selectors/getHistoryCachedPeriods';
import { forceFetchHistory } from './forceFetchHistory';

export const refetchData = () =>
  fetchOrFail(undefined, async (dispatch, _, getState) => {
    const historyCachedPeriods = getHistoryCachedPeriods(getState());

    await Promise.all([
      ...historyCachedPeriods.map(
        ({ from, to, groupBy }) =>
          groupBy &&
          from &&
          to &&
          dispatch(forceFetchHistory(from, to, groupBy)),
      ),
    ]);
  });
