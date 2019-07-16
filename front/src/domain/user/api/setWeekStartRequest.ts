import { Api } from '&front/domain/api'
import { Currency } from '&shared/enum/Currency'

export const setWeekStartRequest = (api: Api) => (
  onMonday: boolean,
): Promise<Currency> =>
  api.client
    .post(`user/profile/set-week-start/${onMonday}`)
    .then(response => response.data)
