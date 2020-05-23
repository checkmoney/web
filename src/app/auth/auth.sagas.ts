import { takeLatest, put } from 'redux-saga/effects';

import { actions } from './auth.actions';
import { actions as routerActions } from '../router/router.actions';

export function* handleLogoutSaga() {
  yield takeLatest(
    actions.unauthorized.type,
    function* handleUnauthorizedAction() {
      yield put(routerActions.push('/'));
    },
  );
}
