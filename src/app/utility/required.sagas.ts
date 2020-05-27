import { takeEvery, call, select, put } from 'redux-saga/effects';
import { Action } from 'redux';

import { State } from '&front/domain/store/State';

import { actions } from './required.actions';
import { RequireType } from './required.types';
import { selectDefaultCurrencyIsAvailable } from '../profile/default_currency.selectors';
import { actions as defaultCurrencyActions } from '../profile/default_currency.actions';

function* requireSaga(
  checkDataAvailable: (state: State) => boolean,
  fetchAction: Action<any>,
) {
  const isDataAvailable = yield select(checkDataAvailable);

  if (!isDataAvailable) {
    yield put(fetchAction);
  }
}

function* requireDefaultCurrency() {
  yield call(
    requireSaga,
    selectDefaultCurrencyIsAvailable,
    defaultCurrencyActions.started({}),
  );
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
