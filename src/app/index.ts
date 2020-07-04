import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';

import {
  CategoriesState,
  categoriesReducer,
} from './statistics/categories.reducers';
import { handleCategoriesFetchingSaga } from './statistics/categories.sagas';
import { PeriodsState, periodsReducer } from './statistics/periods.reducers';
import { handlePeriodsFetchingSaga } from './statistics/periods.sagas';
import { handleRequireRemoteDataSaga } from './utility/required.sagas';
import {
  StatisticsMetaState,
  statisticsMetaReducer,
} from './statistics/meta.reducers';

export function* applicationSaga() {
  yield all([
    handleCategoriesFetchingSaga(),
    handlePeriodsFetchingSaga(),
    handleRequireRemoteDataSaga(),
  ]);
}

export interface ApplicationState {
  statistics: {
    categories: CategoriesState;
    periods: PeriodsState;
    meta: StatisticsMetaState;
  };
}

export const applicationReducer = combineReducers({
  statistics: combineReducers({
    categories: categoriesReducer,
    periods: periodsReducer,
    meta: statisticsMetaReducer,
  }),
});
