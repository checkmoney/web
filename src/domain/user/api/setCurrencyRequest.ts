import { Api } from '&front/domain/api';
import { Currency } from '&front/enum/Currency';

export const setCurrencyRequest = (api: Api) => (
  defaultCurrency: Currency,
): Promise<Currency> =>
  api.client
    .post(`user/profile/set-currency/${defaultCurrency}`)
    .then((response) => response.data);
