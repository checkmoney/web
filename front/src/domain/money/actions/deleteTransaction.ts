import { fetchOrFail } from '$front/domain/store'

import { deleteTransactionRequest } from '../api/deleteTransactionRequest'
import { actions as deleteTransactionFetchingActions } from '../reducer/deleteTransactionFetching'
import { refetchData } from './refetchData'

export const deleteTransaction = (id: string) =>
  fetchOrFail(deleteTransactionFetchingActions, async (dispatch, getApi) => {
    await deleteTransactionRequest(getApi())(id)

    await dispatch(refetchData())
  })
