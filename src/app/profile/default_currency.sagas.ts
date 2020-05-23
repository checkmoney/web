import { takeLatest, put, call, delay } from 'redux-saga/effects';

import { createProfileApi } from '&front/app/api/api.sagas';
import { logError } from '&front/app/utility/errors.sagas';
import { Currency } from '&shared/enum/Currency';

import { actions } from './default_currency.actions';
import { ProfileApi } from '../api/parts/ProfileApi';

const ATTEMPT_THRESHOLD = 3;
const RETRY_DELAY = 100;

export function* handleDefaultCurrencyFetchingSaga() {
  yield takeLatest(actions.started.type, function* (
    action: ReturnType<typeof actions.started>,
  ) {
    const { attempt = 0 } = action.payload;

    try {
      const apiClient: ProfileApi = yield createProfileApi();
      const data: Currency = yield call(apiClient.getCurrency);
      yield put(actions.done({ result: data, params: action.payload }));
    } catch (error) {
      yield logError(error);

      if (attempt >= ATTEMPT_THRESHOLD) {
        yield put(
          actions.failed({ params: action.payload, error: 'Unknown error' }),
        );
        return;
      }

      // Ok, lets retry
      yield delay(RETRY_DELAY * attempt);
      yield put(actions.started({ attempt: attempt + 1 }));
    }
  });
}
