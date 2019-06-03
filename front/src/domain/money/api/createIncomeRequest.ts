import { IncomeModel } from '$shared/models/money/IncomeModel'

import { Api } from '$front/domain/api'

export const createIncomeRequest = (api: Api) => (
  income: IncomeModel,
): Promise<void> =>
  api.client
    .post('/money/transaction/income', income)
    .then(response => response.data)
