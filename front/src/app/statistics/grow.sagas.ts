import { takeLatest, put, call, delay } from 'redux-saga/effects';

import { StatisticsApi } from '&front/api/StatisticsApi';
import { createStatisticsApi } from '&front/app/utility/api.sagas';
import { logError } from '&front/app/utility/errors.sagas';

import { actions } from './grow.actions';
import { Grow } from './grow.types';

const ATTEMPT_THRESHOLD = 3;
const RETRY_DELAY = 100;

export function* handleGrowFetchingSaga() {
  yield takeLatest(actions.started.type, function*(
    action: ReturnType<typeof actions.started>,
  ) {
    const { periodType, attempt = 0 } = action.payload;

    try {
      const apiClient: StatisticsApi = yield createStatisticsApi();
      const data: Grow = yield call(apiClient.findGrow, periodType);
      yield put(actions.done({ params: action.payload, result: data }));
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
      yield put(actions.started({ periodType, attempt: attempt + 1 }));
    }
  });
}
