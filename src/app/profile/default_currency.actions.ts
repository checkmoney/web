import actionCreatorFactory from 'typescript-fsa';

import { Currency } from '&shared/enum/Currency';

const actionCreator = actionCreatorFactory('DEFAULT_CURRENCY');

export const actions = actionCreator.async<
  {
    attempt?: number;
  },
  Currency,
  string
>('FETCHING');
