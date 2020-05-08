import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';

import {
  CategoriesState,
  categoriesReducer,
} from './statistics/categories.reducers';
import { handleCategoriesFetchingSaga } from './statistics/categories.sagas';
import { GrowState, growReducer } from './statistics/grow.reducers';
import { handleGrowFetchingSaga } from './statistics/grow.sagas';

export function* applicationSaga() {
  yield all([handleGrowFetchingSaga(), handleCategoriesFetchingSaga()]);
}

export interface ApplicationState {
  statistics: {
    grow: GrowState;
    categories: CategoriesState;
  };
}

export const applicationReducer = combineReducers({
  statistics: combineReducers({
    grow: growReducer,
    categories: categoriesReducer,
  }),
});
