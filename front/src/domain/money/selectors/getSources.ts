import { State } from '&front/domain/store';

export const getSources = (state: State) => state.money.listSources.data;
