import { takeLatest, all } from 'redux-saga/effects';

import { routerActions } from './router.actions';
import { router } from './router';

function* handlePushSaga() {
  // eslint-disable-next-line require-yield
  yield takeLatest(routerActions.push.type, function* (
    action: ReturnType<typeof routerActions.push>,
  ) {
    const { route, params = {} } = action.payload;

    router.navigate(route, params);
  });
}

export function* handleRouterSaga() {
  yield all([handlePushSaga()]);
}
