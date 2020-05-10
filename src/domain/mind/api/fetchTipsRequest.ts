import { Api } from '&front/domain/api';
import { actualizeStore } from '&front/domain/store/utils/actualizeStore';
import { TipModel } from '&shared/models/mind/TipModel';

export const fetchTipsRequest = (api: Api) => (): Promise<TipModel[]> =>
  api.client.get('/mind/tip').then((response) => actualizeStore(response.data));
