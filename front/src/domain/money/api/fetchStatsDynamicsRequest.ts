import { Api } from '&front/domain/api';
import { actualizeStore } from '&front/domain/store/utils/actualizeStore';
import { Currency } from '&shared/enum/Currency';
import { GroupBy } from '&shared/enum/GroupBy';
import { DateGroupModel } from '&shared/models/money/DateGroupModel';

export const fetchStatsDynamicsRequest = (api: Api) => (
  from: Date,
  to: Date,
  by: GroupBy,
  currency: Currency,
): Promise<DateGroupModel[]> =>
  api.client
    .get('/money/statistics/date-range', {
      params: {
        from,
        to,
        by,
        currency,
      },
    })
    .then(response => actualizeStore(response.data));
