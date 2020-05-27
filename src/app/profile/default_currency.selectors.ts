import { State } from '&front/domain/store/State';

export const selectDefaultCurrency = (state: State) =>
  state.application.profile.defaultCurrency.value;

export const selectDefaultCurrencyIsAvailable = (state: State) =>
  Boolean(selectDefaultCurrency(state));
