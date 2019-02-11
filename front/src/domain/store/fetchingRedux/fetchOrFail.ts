import { AnyAction, Dispatch } from 'redux'

import { State } from '../State'

interface FetchActions {
  request: () => AnyAction
  success: () => AnyAction
  failure: (error: string) => AnyAction
}

type Execute = (
  dispatch: Dispatch,
  getState: () => State,
) => Promise<void | any>

export const fetchOrFail = (
  fetchActions: FetchActions,
  execute: Execute,
) => async (dispatch: Dispatch<AnyAction>, getState: () => State) => {
  const { request, success, failure } = fetchActions

  try {
    dispatch(request())

    await execute(dispatch, getState)

    dispatch(success())
  } catch (e) {
    dispatch(failure(e.message))

    throw e
  }
}
