import { State } from '&front/domain/store';

export const getStatsAverageFetchingStatus = (state: State) =>
  state.money.statsAverage.fetching;
