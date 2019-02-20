import { fetchOrFail } from '@front/domain/fetching-redux'

import { signIn as signInRequest } from '../api/signIn'
import { actions as dataActions } from '../reducer/data'
import { actions as signInActions } from '../reducer/signIn'
import { setCookie } from '../setCookie'

const { setToken } = dataActions

export const signIn = (login: string, password: string) =>
  fetchOrFail(signInActions, async (dispatch, getApi) => {
    const { token } = await signInRequest(getApi())(login, password)

    setCookie(token)

    dispatch(setToken(token))
  })
