import actionCreatorFactory from 'typescript-fsa';

import { Currency } from '&front/application/profile';

const actionCreator = actionCreatorFactory('STATISTICS_META');

export const actions = {
  setCurrency: actionCreator<Currency>('SET_CURRENCY'),
};
