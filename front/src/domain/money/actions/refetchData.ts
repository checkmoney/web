import { fetchTips } from '&front/domain/mind/actions/fetchTips';
import { fetchOrFail } from '&front/domain/store';

import { getHistoryCachedPeriods } from '../selectors/getHistoryCachedPeriods';
import { getStatsCachedPeriods } from '../selectors/getStatsCachedPeriods';
import { fetchFirstTransactionDate } from './fetchFirstTransactionDate';
import { forceFetchHistory } from './forceFetchHistory';
import { forceFetchStatsDynamics } from './forceFetchStatsDynamics';

export const refetchData = () =>
  fetchOrFail(undefined, async (dispatch, _, getState) => {
    const historyCachedPeriods = getHistoryCachedPeriods(getState());
    const statsCachedPeriods = getStatsCachedPeriods(getState());

    await Promise.all([
      dispatch(fetchFirstTransactionDate()),
      dispatch(fetchTips()),
      ...historyCachedPeriods.map(
        ({ from, to, groupBy }) =>
          groupBy &&
          from &&
          to &&
          dispatch(forceFetchHistory(from, to, groupBy)),
      ),
      ...statsCachedPeriods.map(
        ({ from, to, groupBy, currency }) =>
          groupBy &&
          currency &&
          from &&
          to &&
          dispatch(forceFetchStatsDynamics(from, to, groupBy, currency)),
      ),
    ]);
  });
