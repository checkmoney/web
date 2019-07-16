import { Api } from '&front/domain/api'
import { TipModel } from '&shared/models/mind/TipModel'
import { actualizeStore } from '&front/domain/store/utils/actualizeStore'

export const fetchTipsRequest = (api: Api) => (): Promise<TipModel[]> =>
  api.client.get('/mind/tip').then(response => actualizeStore(response.data))
