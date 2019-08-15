import { Option } from 'tsoption';

import { createCachedPeriodKey } from '&front/domain/cached-data';
import { State } from '&front/domain/store';
import { Currency } from '&shared/enum/Currency';

export const getStatsCategories = (
  from: Date,
  to: Date,
  currency: Currency,
) => (state: State) =>
  Option.of(
    state.money.statsCategories.data.data[
      createCachedPeriodKey({ from, to, currency })
    ],
  );
