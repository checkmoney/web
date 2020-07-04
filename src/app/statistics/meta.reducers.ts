import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { Currency } from '&front/application/profile';

import { actions } from './meta.actions';

export interface StatisticsMetaState {
  currency: Currency | null;
}

const initialState: StatisticsMetaState = {
  currency: null,
};

export const statisticsMetaReducer = reducerWithInitialState(initialState).case(
  actions.setCurrency,
  (state, currency) => ({
    ...state,
    currency,
  }),
);
