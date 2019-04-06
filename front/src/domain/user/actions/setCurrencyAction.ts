import { fetchOrFail } from '@front/domain/store'

import { actions as signInActions } from '../reducer/signIn'
import { Currency } from '@shared/enum/Currency'
import { setCurrencyRequest } from '../api/setCurrencyRequest'
import { actions as userActions } from '../reducer/user'

const { setCurrency } = userActions

export const setCurrencyAction = (currency: Currency) =>
  fetchOrFail(signInActions, async (dispatch, getApi) => {
    console.log('setCurrencyAction:', currency)

    const { recievedCurrency } = await setCurrencyRequest(getApi())(currency)
    console.log('recievedCurrency:', recievedCurrency)
    dispatch(setCurrency(currency))
  })
