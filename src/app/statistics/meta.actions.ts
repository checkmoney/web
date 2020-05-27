import actionCreatorFactory from 'typescript-fsa';

import { Currency } from '&shared/enum/Currency';

const actionCreator = actionCreatorFactory('STATISTICS_META');

export const actions = {
  setCurrency: actionCreator<Currency>('SET_CURRENCY'),
};
