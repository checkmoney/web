import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { Option } from 'tsoption';

import { Api } from '&front/domain/api';
import { ExtraArg, State } from '&front/domain/store';
import { tryOr } from '&shared/helpers/tryOr';
import { retrieveToken } from '&front/app/auth/auth.utils';

interface FetchActions {
  request: () => AnyAction;
  success: () => AnyAction;
  failure: (error: string) => AnyAction;
}

type Execute = (
  dispatch: ThunkDispatch<State, ExtraArg, AnyAction>,
  getApi: () => Api,
  getState: () => State,
) => Promise<void | any>;

const defaultActions: FetchActions = {
  request: () => ({ type: '' }),
  success: () => ({ type: '' }),
  failure: () => ({ type: '' }),
};

export const fetchOrFail = (
  fetchActions: FetchActions = defaultActions,
  execute: Execute,
) => async (
  dispatch: ThunkDispatch<State, ExtraArg, AnyAction>,
  getState: () => State,
  createApi: (token: Option<string>) => Api,
) => {
  const { request, success, failure } = fetchActions;

  try {
    dispatch(request());

    const token = retrieveToken();
    await execute(dispatch, () => createApi(Option.of(token)), getState);

    dispatch(success());
  } catch (error) {
    dispatch(failure(tryOr(() => error.response.data.message, error.message)));

    throw error;
  }
};
