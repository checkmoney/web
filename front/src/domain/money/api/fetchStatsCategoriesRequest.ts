import { Api } from '@front/domain/api'
import { actualizeStore } from '@front/domain/store/utils/actualizeStore'
import { Currency } from '@shared/enum/Currency'
import { CategoryGroupOutcomeModel } from '@shared/models/money/CategoryGroupOutcomeModel'

export const fetchStatsCategoriesRequest = (api: Api) => (
  from: Date,
  to: Date,
  currency: Currency,
): Promise<CategoryGroupOutcomeModel[]> =>
  api.client
    .get('/money/statistics/outcome-categories', {
      params: {
        from,
        to,
        currency,
      },
    })
    .then(response => actualizeStore(response.data))
