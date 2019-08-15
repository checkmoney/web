import { fetchOrFail } from '&front/domain/store';
import { Currency } from '&shared/enum/Currency';
import { GroupBy } from '&shared/enum/GroupBy';

import { fetchStatsDynamicsRequest } from '../api/fetchStatsDynamicsRequest';
import { actions } from '../reducer/statsDynamics';

export const forceFetchStatsDynamics = (
  from: Date,
  to: Date,
  groupBy: GroupBy,
  currency: Currency,
) =>
  fetchOrFail(undefined, async (dispatch, getApi) => {
    const stats = await fetchStatsDynamicsRequest(getApi())(
      from,
      to,
      groupBy,
      currency,
    );

    dispatch(actions.data.addStats({ from, to, groupBy, currency }, stats));
  });
