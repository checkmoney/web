import { takeLatest, put } from 'redux-saga/effects';

import { actions } from './auth.actions';
import { routerActions } from '../router/router.actions';
import { Route } from '../router/router.types';

export function* handleLogoutSaga() {
  yield takeLatest(
    actions.unauthorized.type,
    function* handleUnauthorizedAction() {
      yield put(routerActions.push({ route: Route.Login }));
    },
  );
}
