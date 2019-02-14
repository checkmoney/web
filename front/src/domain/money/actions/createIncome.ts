import { IncomeModel } from '@shared/models/money/IncomeModel'

import { fetchOrFail } from '@front/domain/store/fetchingRedux/fetchOrFail'

import { createIncomeRequest } from '../api/createIncomeRequest'
import { actions as incomeFetchingActions } from '../reducer/createIncomeFetching'
import { getHistoryCachedPeriods } from '../selectors/getHistoryCachedPeriods'
import { fetchFirstTransactionDate } from './fetchFirstTransactionDate'
import { forceFetchHistory } from './forceFetchHistory'

export const createIncome = (incomeFields: IncomeModel) =>
  fetchOrFail(incomeFetchingActions, async (dispatch, getApi, getState) => {
    await createIncomeRequest(getApi())(incomeFields)

    await dispatch(fetchFirstTransactionDate() as any)

    const historyCachedPerios = getHistoryCachedPeriods(getState())

    await Promise.all(
      historyCachedPerios.map(({ from, to, groupBy }) =>
        dispatch(forceFetchHistory(from, to, groupBy) as any),
      ),
    )
  })
