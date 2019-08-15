import { Api } from '&front/domain/api';

export const deleteTransactionRequest = (api: Api) => (
  id: string,
): Promise<void> =>
  api.client.delete(`/money/transaction/${id}`).then(response => response.data);
