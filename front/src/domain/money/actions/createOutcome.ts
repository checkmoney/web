import { OutcomeModel } from '@shared/models/money/OutcomeModel'

import { fetchOrFail } from '@front/domain/store/fetchingRedux/fetchOrFail'

import { createOutcomeRequest } from '../api/createOutcomeRequest'
import { actions as outcomeFetchingActions } from '../reducer/createOutcomeFetching'
import { getHistoryCachedPeriods } from '../selectors/getHistoryCachedPeriods'
import { fetchFirstTransactionDate } from './fetchFirstTransactionDate'
import { forceFetchHistory } from './forceFetchHistory'

export const createOutcome = (outcomeFields: OutcomeModel) =>
  fetchOrFail(outcomeFetchingActions, async (dispatch, getApi, getState) => {
    await createOutcomeRequest(getApi())(outcomeFields)

    await dispatch(fetchFirstTransactionDate() as any)

    const historyCachedPerios = getHistoryCachedPeriods(getState())

    await Promise.all(
      historyCachedPerios.map(({ from, to, groupBy }) =>
        dispatch(forceFetchHistory(from, to, groupBy) as any),
      ),
    )
  })
