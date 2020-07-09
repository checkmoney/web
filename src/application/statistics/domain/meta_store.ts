import { createStore } from 'effector';

import { Currency } from '&front/application/currency';
import { requestFx } from '&front/application/api';

/**
 * In any request we can recieve new currency
 */
const newCurrencyRecieved = requestFx.doneData.filterMap<Currency>(
  ({ headers }) => headers['checkmoney-currency'],
);

interface MetaStore {
  currency?: Currency;
}

const $statisticsMeta = createStore<MetaStore>({}).on(
  newCurrencyRecieved,
  (state, currency) => ({ ...state, currency }),
);

export { $statisticsMeta };
