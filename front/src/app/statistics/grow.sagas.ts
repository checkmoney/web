import { takeLatest, put, call, delay } from 'redux-saga/effects';

import { StatisticsApi } from '&front/api/StatisticsApi';
import { createStatisticsApi } from '&front/app/api/api.sagas';

import {
  GrowActions,
  growDataReceived,
  GrowRequestedAction,
  growRequested,
} from './grow.actions';
import { GrowItem } from './grow.types';

const ATTEMPT_THRESHOLD = 2;
const RETRY_DELAY = 100;

export function* handleGrowFetchingSaga() {
  yield takeLatest(GrowActions.Requested, function*(
    action: GrowRequestedAction,
  ) {
    const { periodType, attempt } = action.payload;

    const apiClient: StatisticsApi = yield createStatisticsApi();

    try {
      const data: GrowItem = yield call(apiClient.findGrow, periodType);

      yield put(growDataReceived(periodType, data));
    } catch (error) {
      // TODO: log error
      console.error(error);

      if (attempt >= ATTEMPT_THRESHOLD) {
        return;
      }

      // Ok, lets retry
      yield delay(RETRY_DELAY);
      yield put(growRequested(periodType, attempt + 1));
    }
  });
}
