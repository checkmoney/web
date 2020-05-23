import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { Currency } from '&shared/enum/Currency';

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
