import { Api } from '&front/domain/api';
import { CustomTipModel } from '&shared/models/mind/CustomTipModel';

export const createTipRequest = (api: Api) => (
  tip: CustomTipModel,
): Promise<void> =>
  api.client.post('/mind/tip/create', tip).then(response => response.data);
