import { takeLatest, call } from 'redux-saga/effects';

import { actions } from './auth.actions';
import { Route } from '../router/router.types';
import { router } from '../router/router';

export function* handleLogoutSaga() {
  yield takeLatest(
    actions.unauthorized.type,
    function* handleUnauthorizedAction() {
      yield call(router.navigate, Route.Login);
    },
  );
}
