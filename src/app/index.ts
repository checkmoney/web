import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';

import {
  CategoriesState,
  categoriesReducer,
} from './statistics/categories.reducers';
import {
  DefaultCurrencyState,
  defaultCurrencyReducer,
} from './profile/default_currency.reducers';
import { handleCategoriesFetchingSaga } from './statistics/categories.sagas';
import { GrowState, growReducer } from './statistics/grow.reducers';
import { handleGrowFetchingSaga } from './statistics/grow.sagas';
import { PeriodsState, periodsReducer } from './statistics/periods.reducers';
import { handlePeriodsFetchingSaga } from './statistics/periods.sagas';
import { handleLogoutSaga } from './auth/auth.sagas';
import { handleDefaultCurrencyFetchingSaga } from './profile/default_currency.sagas';
import { handleRequireRemoteDataSaga } from './utility/required.sagas';
import {
  StatisticsMetaState,
  statisticsMetaReducer,
} from './statistics/meta.reducers';

export function* applicationSaga() {
  yield all([
    handleGrowFetchingSaga(),
    handleCategoriesFetchingSaga(),
    handlePeriodsFetchingSaga(),
    handleDefaultCurrencyFetchingSaga(),
    handleRequireRemoteDataSaga(),
    handleLogoutSaga(),
  ]);
}

export interface ApplicationState {
  statistics: {
    grow: GrowState;
    categories: CategoriesState;
    periods: PeriodsState;
    meta: StatisticsMetaState;
  };
  profile: {
    defaultCurrency: DefaultCurrencyState;
  };
}

export const applicationReducer = combineReducers({
  statistics: combineReducers({
    grow: growReducer,
    categories: categoriesReducer,
    periods: periodsReducer,
    meta: statisticsMetaReducer,
  }),
  profile: combineReducers({
    defaultCurrency: defaultCurrencyReducer,
  }),
});
