import { takeLatest } from 'redux-saga/effects';

import { pushRoute } from '&front/features/routing';

import { actions } from './router.actions';

export function* handleRouterPushSaga() {
  // eslint-disable-next-line require-yield
  yield takeLatest(actions.push.type, function* (
    action: ReturnType<typeof actions.push>,
  ) {
    pushRoute(action.payload);
  });
}
