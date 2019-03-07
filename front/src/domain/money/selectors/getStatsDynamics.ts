import { Option } from 'tsoption'

import { State } from '@front/domain/store'
import { Currency } from '@shared/enum/Currency'
import { GroupBy } from '@shared/enum/GroupBy'
import { createStatsKey } from '../helpers/createStatsKey'

export const getStatsDynamics = (
  from: Date,
  to: Date,
  groupBy: GroupBy,
  currency: Currency,
) => (state: State) =>
  Option.of(
    state.money.statsDynamics.data.data[
      createStatsKey(from, to, groupBy, currency)
    ],
  )
