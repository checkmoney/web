import { State } from '&front/domain/store';

export const getCategories = (state: State) => state.money.listCategories.data;
