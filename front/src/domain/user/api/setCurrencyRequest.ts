import { Api } from '@front/domain/api'
import { Currency } from '@shared/enum/Currency'

export const setCurrencyRequest = (api: Api) => (
  currency: Currency,
): Promise<any> =>
  api.client
    .put('user/profile', {
      currency,
    })
    .then(response => response.data)
