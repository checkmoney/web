import { Option } from 'tsoption'

import { State } from '@front/domain/store'
import { Currency } from '@shared/enum/Currency'
import { createCachedPeriodKey } from '@front/domain/cached-data'

export const getStatsSources = (from: Date, to: Date, currency: Currency) => (
  state: State,
) =>
  Option.of(
    state.money.statsSources.data.data[
      createCachedPeriodKey({ from, to, currency })
    ],
  )
