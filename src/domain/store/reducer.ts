import { combineReducers } from 'redux';

import { applicationReducer } from '&front/app';
import { reducer as mindReducer } from '&front/domain/mind/reducer';
import { reducer as moneyReducer } from '&front/domain/money/reducer';

import { State } from './State';

export const reducer = combineReducers<State>({
  money: moneyReducer,
  mind: mindReducer,
  application: applicationReducer,
});
