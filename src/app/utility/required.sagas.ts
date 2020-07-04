import { takeEvery, call, select, put } from 'redux-saga/effects';
import { Action } from 'redux';

import { State } from '&front/domain/store/State';
import { getCurrencyFx } from '&front/application/profile';

import { actions } from './required.actions';
import { RequireType } from './required.types';

// eslint-disable-next-line require-yield
function* requireDefaultCurrency() {
  getCurrencyFx();
}

export function* handleRequireRemoteDataSaga() {
  const requireMap = {
    [RequireType.DefaultCurrency]: requireDefaultCurrency,
  };

  yield takeEvery(actions.dataRequired.type, function* (
    action: ReturnType<typeof actions.dataRequired>,
  ) {
    const saga = requireMap[action.payload];

    if (saga) {
      yield call(saga);
    }
  });
}
