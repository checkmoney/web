import { fetchOrFail } from '@front/domain/store/fetchingRedux/fetchOrFail'

import { signUp as signUpRequest } from '../api/signUp'
import { actions as dataActions } from '../reducer/data'
import { actions as signUpActions } from '../reducer/signUp'
import { setCookie } from '../setCookie'

const { setToken } = dataActions

export const signUp = (login: string, password: string) =>
  fetchOrFail(signUpActions, async (dispatch, getApi) => {
    const { token } = await signUpRequest(getApi())(login, password)

    setCookie(token)

    dispatch(setToken(token))
  })
