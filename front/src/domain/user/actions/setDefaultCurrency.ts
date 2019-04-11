import { fetchOrFail } from '@front/domain/store'
import { Currency } from '@shared/enum/Currency'

import { setCurrencyRequest } from '../api/setCurrencyRequest'
import { actions as userActions } from '../reducer/user'
import { getUserProfile } from './getUserProfile'

export const setDefaultCurrency = (currency: Currency) => {
  return fetchOrFail(userActions.fetching, async (dispatch, getApi) => {
    await setCurrencyRequest(getApi())(currency)

    await dispatch(getUserProfile())
  })
}
