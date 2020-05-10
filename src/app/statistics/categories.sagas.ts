import { takeLatest, put, call, delay } from 'redux-saga/effects';

import { StatisticsApi } from '&front/api/StatisticsApi';
import { createStatisticsApi } from '&front/app/utility/api.sagas';
import { logError } from '&front/app/utility/errors.sagas';

import { actions } from './categories.actions';
import { PeriodCategories } from './categories.types';

const ATTEMPT_THRESHOLD = 3;
const RETRY_DELAY = 100;

export function* handleCategoriesFetchingSaga() {
  yield takeLatest(actions.started.type, function* (
    action: ReturnType<typeof actions.started>,
  ) {
    const { periodType, attempt = 0, dateRange } = action.payload;

    try {
      const apiClient: StatisticsApi = yield createStatisticsApi();
      const data: PeriodCategories[] = yield call(
        apiClient.fetchCategories,
        periodType,
        dateRange,
      );
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
