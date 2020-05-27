import { takeLatest, call } from 'redux-saga/effects';

import { actions } from './auth.actions';
import { router, Route } from '../router';

export function* handleLogoutSaga() {
  yield takeLatest(
    actions.unauthorized.type,
    function* handleUnauthorizedAction() {
      yield call(router.navigate, Route.Login);
    },
  );
}
