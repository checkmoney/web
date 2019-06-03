import { MergeTypoModel } from '$shared/models/mind/MergeTypoModel'
import { refetchData } from '$front/domain/money/actions/refetchData'
import { fetchOrFail } from '$front/domain/store'

import { actions } from '../reducer/tips'
import { mergeTypoRequest } from '../api/mergeTypoRequest'

export const mergeTypos = (token: string, merge: MergeTypoModel) =>
  fetchOrFail(actions.fetching, async (dispatch, getApi) => {
    await mergeTypoRequest(getApi())(merge)

    dispatch(actions.data.removeTips([token]))

    await dispatch(refetchData())
  })
