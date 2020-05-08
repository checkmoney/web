import { takeLatest, put, call, delay } from 'redux-saga/effects';

import { StatisticsApi } from '&front/api/StatisticsApi';
import { createStatisticsApi } from '&front/app/utility/api.sagas';
import { logError } from '&front/app/utility/errors.sagas';

import {
  GrowActions,
  growDataReceived,
  GrowRequestedAction,
  growRequested,
  growFatalErrorHappened,
} from './grow.actions';
import { Grow } from './grow.types';

const ATTEMPT_THRESHOLD = 3;
const RETRY_DELAY = 100;

export function* handleGrowFetchingSaga() {
  yield takeLatest(GrowActions.Requested, function*(
    action: GrowRequestedAction,
  ) {
    const { periodType, attempt } = action.payload;

    try {
      const apiClient: StatisticsApi = yield createStatisticsApi();
      const data: Grow = yield call(apiClient.findGrow, periodType);
      yield put(growDataReceived(periodType, data));
    } catch (error) {
      yield logError(error);

      if (attempt >= ATTEMPT_THRESHOLD) {
        yield put(growFatalErrorHappened(periodType));
        return;
      }

      // Ok, lets retry
      yield delay(RETRY_DELAY * attempt);
      yield put(growRequested(periodType, attempt + 1));
    }
  });
}
