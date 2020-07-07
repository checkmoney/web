import { combineReducers } from 'redux';

import { reducer as moneyReducer } from '&front/domain/money/reducer';

import { State } from './State';

export const reducer = combineReducers<State>({
  money: moneyReducer,
});
