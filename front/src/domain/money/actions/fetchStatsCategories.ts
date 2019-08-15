import { fetchOrFail } from '&front/domain/store';
import { Currency } from '&shared/enum/Currency';

import { fetchStatsCategoriesRequest } from '../api/fetchStatsCategoriesRequest';
import { actions } from '../reducer/statsCategories';
import { getStatsCategories } from '../selectors/getStatsCategories';

export const fetchStatsCategories = (
  from: Date,
  to: Date,
  currency: Currency,
) =>
  fetchOrFail(actions.fetching, async (dispatch, getApi, getState) => {
    const existStats = getStatsCategories(from, to, currency)(getState());

    if (existStats.isEmpty()) {
      const stats = await fetchStatsCategoriesRequest(getApi())(
        from,
        to,
        currency,
      );

      dispatch(actions.data.addStats({ from, to, currency }, stats));
    }
  });
