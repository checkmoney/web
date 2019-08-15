import { State } from '&front/domain/store';

export const getStatsCategoriesFetchingStatus = (state: State) =>
  state.money.statsCategories.fetching;
