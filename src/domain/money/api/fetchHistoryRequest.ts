import { Api } from '&front/domain/api';
import { actualizeStore } from '&front/domain/store/utils/actualizeStore';
import { GroupBy } from '&shared/enum/GroupBy';
import { HistoryGroupModel } from '&shared/models/money/HistoryGroupModel';

export const fetchHistoryRequest = (api: Api) => (
  from: Date,
  to: Date,
  by: GroupBy,
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
