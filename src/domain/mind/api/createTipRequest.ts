import { Api } from '&front/domain/api';
import { CustomTipModel } from '&front/models/mind/CustomTipModel';

export const createTipRequest = (api: Api) => (
  tip: CustomTipModel,
): Promise<void> =>
  api.client.post('/mind/tip/create', tip).then((response) => response.data);
