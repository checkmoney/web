import { Api } from '@front/domain/api'
import { actualizeStore } from '@front/domain/store/utils/actualizeStore'

export const fetchCategoriesRequest = (api: Api) => (): Promise<string[]> =>
  api.client
    .get('/money/history/all-categories')
    .then(response => actualizeStore(response.data))
