import { Api } from '&front/domain/api';
import { actualizeStore } from '&front/domain/store/utils/actualizeStore';
import { PeriodType } from '&front/shared';
import { HistoryGroupModel } from '&front/models/money/HistoryGroupModel';

export const fetchHistoryRequest = (api: Api) => (
  from: Date,
  to: Date,
  by: PeriodType,
): Promise<HistoryGroupModel[]> =>
  api.client
    .get('/money/history/grouped', {
      params: {
        from,
        to,
        by,
      },
    })
    .then((response) => actualizeStore(response.data));
