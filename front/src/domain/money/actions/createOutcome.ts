import { OutcomeModel } from '@shared/models/money/OutcomeModel'

import { fetchOrFail } from '@front/domain/store/fetchingRedux/fetchOrFail'

import { createOutcomeRequest } from '../api/createOutcomeRequest'
import { actions as outcomeFetchingActions } from '../reducer/createOutcomeFetching'

export const createOutcome = (outcomeFields: OutcomeModel) =>
  fetchOrFail(outcomeFetchingActions, async (_, getApi) => {
    await createOutcomeRequest(getApi())(outcomeFields)
  })
