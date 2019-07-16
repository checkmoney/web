import { fetchOrFail } from '&front/domain/store'
import { CustomTipModel } from '&shared/models/mind/CustomTipModel'

import { createTipRequest } from '../api/createTipRequest'
import { actions as tipFetchingActions } from '../reducer/createTipFetching'

export const createTip = (tip: CustomTipModel) =>
  fetchOrFail(tipFetchingActions, async (_, getApi) => {
    await createTipRequest(getApi())(tip)
  })
