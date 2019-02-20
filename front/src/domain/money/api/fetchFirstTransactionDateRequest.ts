import { Api } from '@front/domain/api'
import { actualizeStore } from '@front/domain/store/utils/actualizeStore'

export const fetchFirstTransactionDateRequest = (api: Api) => (): Promise<
  Date
> =>
  api.client
    .get('/money/history/earliest')
    .then(response => actualizeStore(response.data))
