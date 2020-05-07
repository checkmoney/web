import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';

import { GrowState, growReducer } from './statistics/grow.reducers';
import { handleGrowFetchingSaga } from './statistics/grow.sagas';

export function* applicationSaga() {
  yield all([handleGrowFetchingSaga()]);
}

export interface ApplicationState {
  statistics: {
    grow: GrowState;
  };
}

export const applicationReducer = combineReducers({
  statistics: combineReducers({
    grow: growReducer,
  }),
});
