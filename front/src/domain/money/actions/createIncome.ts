import { IncomeModel } from '@shared/models/money/IncomeModel'

import { fetchOrFail } from '@front/domain/store/fetchingRedux/fetchOrFail'

import { createIncomeRequest } from '../api/createIncomeRequest'
import { actions as incomeFetchingActions } from '../reducer/createIncomeFetching'

export const createIncome = (incomeFields: IncomeModel) =>
  fetchOrFail(incomeFetchingActions, async (_, getApi) => {
    await createIncomeRequest(getApi())(incomeFields)
  })
