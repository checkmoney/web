import { Api } from '$front/domain/api'
import { actualizeStore } from '$front/domain/store/utils/actualizeStore'

export const fetchSourcesRequest = (api: Api) => (): Promise<string[]> =>
  api.client
    .get('/money/history/all-sources')
    .then(response => actualizeStore(response.data))
