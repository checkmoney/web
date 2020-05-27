import { State } from '&front/domain/store/State';

export const selectStatisticsCurrency = (state: State) =>
  state.application.statistics.meta.currency;
