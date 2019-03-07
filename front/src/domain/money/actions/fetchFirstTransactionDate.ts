import { fetchOrFail } from '@front/domain/store'

import { fetchFirstTransactionDateRequest } from '../api/fetchFirstTransactionDateRequest'
import { actions as dataActions } from '../reducer/firstTransactionDate'

const { set } = dataActions

export const fetchFirstTransactionDate = () =>
  fetchOrFail(undefined, async (dispatch, getApi) => {
    const date = await fetchFirstTransactionDateRequest(getApi())()

    dispatch(set(date))
  })
