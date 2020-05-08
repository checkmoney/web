import { takeLatest, put, call, delay } from 'redux-saga/effects';

import { StatisticsApi } from '&front/api/StatisticsApi';
import { createStatisticsApi } from '&front/app/utility/api.sagas';
import { logError } from '&front/app/utility/errors.sagas';

import {
  CategoriesActions,
  CategoriesRequestedAction,
  categoriesDataReceived,
  categoriesFatalErrorHappened,
  categoriesRequested,
} from './categories.actions';
import { PeriodCategories } from './categories.types';

const ATTEMPT_THRESHOLD = 3;
const RETRY_DELAY = 100;

export function* handleCategoriesFetchingSaga() {
  yield takeLatest(CategoriesActions.Requested, function*(
    action: CategoriesRequestedAction,
  ) {
    const { periodType, attempt, dateRange } = action.payload;

    try {
      const apiClient: StatisticsApi = yield createStatisticsApi();
      const data: PeriodCategories[] = yield call(
        apiClient.fetchCategories,
        periodType,
        dateRange,
      );
      yield put(categoriesDataReceived(periodType, dateRange, data));
    } catch (error) {
      yield logError(error);

      if (attempt >= ATTEMPT_THRESHOLD) {
        yield put(categoriesFatalErrorHappened(periodType, dateRange));
        return;
      }

      // Ok, lets retry
      yield delay(RETRY_DELAY * attempt);
      yield put(categoriesRequested(periodType, dateRange, attempt + 1));
    }
  });
}
