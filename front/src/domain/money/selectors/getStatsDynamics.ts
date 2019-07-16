import { Option } from 'tsoption'

import { State } from '&front/domain/store'
import { Currency } from '&shared/enum/Currency'
import { GroupBy } from '&shared/enum/GroupBy'
import { createCachedPeriodKey } from '&front/domain/cached-data'

export const getStatsDynamics = (
  from: Date,
  to: Date,
  groupBy: GroupBy,
  currency: Currency,
) => (state: State) =>
  Option.of(
    state.money.statsDynamics.data.data[
      createCachedPeriodKey({ from, to, groupBy, currency })
    ],
  )
