import { State } from '&front/domain/store';

export const getCreateIncomeFetching = (state: State) =>
  state.money.createIncomeFetching;
