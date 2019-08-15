import { combineReducers } from 'redux';

import { reducer as tipsReducer, State as TipsState } from './tips';
import {
  reducer as createTipFetchingReducer,
  State as CreateTipTipState,
} from './createTipFetching';

interface State {
  tips: TipsState;
  createTipFetching: CreateTipTipState;
}

const reducer = combineReducers<State>({
  tips: tipsReducer,
  createTipFetching: createTipFetchingReducer,
});

export { reducer, State };
