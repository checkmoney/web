import { State } from '&front/domain/store';

export const getDefaultCurrency = (state: State) =>
  state.user.profile.data.defaultCurrency;
