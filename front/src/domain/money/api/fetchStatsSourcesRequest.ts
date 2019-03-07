import { Api } from '@front/domain/api'
import { actualizeStore } from '@front/domain/store/utils/actualizeStore'
import { Currency } from '@shared/enum/Currency'
import { SourceGroupIncomeModel } from '@shared/models/money/SourceGroupIncomeModel'

export const fetchStatsSourcesRequest = (api: Api) => (
  from: Date,
  to: Date,
  currency: Currency,
): Promise<SourceGroupIncomeModel[]> =>
  api.client
    .get('/money/statistics/income-sources', {
      params: {
        from,
        to,
        currency,
      },
    })
    .then(response => actualizeStore(response.data))
