import { AnyAction, Dispatch } from 'redux'
import { Option } from 'tsoption'

import { Api } from '@front/domain/api/Api'
import { getToken } from '@front/domain/user/selectors/getToken'

import { State } from '../State'

interface FetchActions {
  request: () => AnyAction
  success: () => AnyAction
  failure: (error: string) => AnyAction
}

type Execute = (
  dispatch: Dispatch,
  getApi: () => Api,
  getState: () => State,
) => Promise<void | any>

export const fetchOrFail = (
  fetchActions: FetchActions,
  execute: Execute,
) => async (
  dispatch: Dispatch<AnyAction>,
  getState: () => State,
  createApi: (token: Option<string>) => Api,
) => {
  const { request, success, failure } = fetchActions

  try {
    dispatch(request())

    await execute(dispatch, () => createApi(getToken(getState())), getState)

    dispatch(success())
  } catch (e) {
    dispatch(failure(e.message))

    throw e
  }
}
