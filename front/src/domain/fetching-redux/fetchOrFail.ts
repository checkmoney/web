import { AnyAction, Dispatch } from 'redux'
import { Option } from 'tsoption'

import { Api } from '@front/domain/api'
import { State } from '@front/domain/store'
import { getToken } from '@front/domain/user/selectors/getToken'

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

const defaultActions: FetchActions = {
  request: () => ({ type: '' }),
  success: () => ({ type: '' }),
  failure: () => ({ type: '' }),
}

export const fetchOrFail = (
  fetchActions: FetchActions = defaultActions,
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

    // tslint:disable-next-line:no-console
    console.log(e.code) // Try log HTTP errors

    throw e
  }
}
