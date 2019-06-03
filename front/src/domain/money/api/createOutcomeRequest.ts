import { OutcomeModel } from '$shared/models/money/OutcomeModel'

import { Api } from '$front/domain/api'

export const createOutcomeRequest = (api: Api) => (
  income: OutcomeModel,
): Promise<void> =>
  api.client
    .post('/money/transaction/outcome', income)
    .then(response => response.data)
