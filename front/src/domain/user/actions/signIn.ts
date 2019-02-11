import { fetchOrFail } from '@front/domain/store/fetchingRedux/fetchOrFail'

import { actions as dataActions } from '../reducer/data'
import { actions as signInActions } from '../reducer/signIn'

const { setToken } = dataActions

export const signIn = (login: string, password: string) =>
  fetchOrFail(signInActions, async dispatch => {
    const { token } = { token: `${login}+${password}` }

    dispatch(setToken(token))
  })
