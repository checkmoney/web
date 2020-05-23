import { takeLatest, all } from 'redux-saga/effects';

import NextRoutes from '../../../routes';
import { routerActions } from './router.actions';

function* handlePushSaga() {
  // eslint-disable-next-line require-yield
  yield takeLatest(routerActions.push.type, function* (
    action: ReturnType<typeof routerActions.push>,
  ) {
    const { route, params = {} } = action.payload;

    const path = Object.entries(params).reduce(
      (pathAcc, [key, value]) => pathAcc.replace(`:${key}`, value),
      route as string,
    );

    NextRoutes.Router.pushRoute(path);
  });
}

export function* handleRouterSaga() {
  yield all([handlePushSaga()]);
}
