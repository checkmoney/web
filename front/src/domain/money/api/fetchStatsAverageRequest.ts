import { Api } from '$front/domain/api'
import { actualizeStore } from '$front/domain/store/utils/actualizeStore'
import { Currency } from '$shared/enum/Currency'
import { GroupBy } from '$shared/enum/GroupBy'
import { AverageAmountModel } from '$shared/models/money/AvergaeAmountModel'

export const fetchStatsAverageRequest = (api: Api) => (
  currency: Currency,
  by: GroupBy,
): Promise<AverageAmountModel[]> =>
  api.client
    .get('/money/statistics/average', {
      params: {
        by,
        currency,
      },
    })
    .then(response => actualizeStore(response.data))
