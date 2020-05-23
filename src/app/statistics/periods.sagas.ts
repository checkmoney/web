import { takeLatest, put, call, delay } from 'redux-saga/effects';

import { StatisticsApi } from '&front/app/api/parts/StatisticsApi';
import { createStatisticsApi } from '&front/app/api/api.sagas';
import { logError } from '&front/app/utility/errors.sagas';

import { actions } from './periods.actions';
import { actions as metaActions } from './meta.actions';

const ATTEMPT_THRESHOLD = 3;
const RETRY_DELAY = 100;

export function* handlePeriodsFetchingSaga() {
  yield takeLatest(actions.started.type, function* (
    action: ReturnType<typeof actions.started>,
  ) {
    const { periodType, dateRange, attempt = 0 } = action.payload;

    try {
      const apiClient: StatisticsApi = yield createStatisticsApi();
      const { data, meta } = yield call(
        apiClient.fetchPeriods,
        periodType,
        dateRange,
      );

      yield put(metaActions.setCurrency(meta.currency));
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
      yield put(
        actions.started({ periodType, dateRange, attempt: attempt + 1 }),
      );
    }
  });
}
