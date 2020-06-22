import { Api } from '&front/domain/api';
import { DisableTipModel } from '&front/models/mind/DisableTipModel';

export const disableTipsRequest = (api: Api) => (
  disableTip: DisableTipModel,
): Promise<void> =>
  api.client
    .post('/mind/tip/disable', disableTip)
    .then((response) => response.data);
