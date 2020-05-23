import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { Currency } from '&shared/enum/Currency';

import { actions } from './default_currency.actions';

type StateData = { value?: Currency };

export interface DefaultCurrencyState extends StateData {
  error: string | null;
}

const initialState: DefaultCurrencyState = {
  error: null,
};

export const defaultCurrencyReducer = reducerWithInitialState(initialState)
  .case(actions.done, (state, { result }) => ({
    ...state,
    value: result,
    error: null,
  }))
  .case(actions.failed, (state, { error }) => ({
    ...state,
    error,
  }));
