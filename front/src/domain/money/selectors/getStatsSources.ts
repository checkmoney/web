import { Option } from 'tsoption';

import { createCachedPeriodKey } from '&front/domain/cached-data';
import { Currency } from '&shared/enum/Currency';
import { State } from '&front/domain/store';

export const getStatsSources = (from: Date, to: Date, currency: Currency) => (
  state: State,
) =>
  Option.of(
    state.money.statsSources.data.data[
      createCachedPeriodKey({ from, to, currency })
    ],
  );
