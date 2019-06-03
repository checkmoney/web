import { Option } from 'tsoption'

import { State } from '$front/domain/store'
import { Currency } from '$shared/enum/Currency'
import { createCachedPeriodKey } from '$front/domain/cached-data'
import { GroupBy } from '$shared/enum/GroupBy'

export const getStatsAverage = (currency: Currency, groupBy: GroupBy) => (
  state: State,
) =>
  Option.of(
    state.money.statsAverage.data.data[
      createCachedPeriodKey({ currency, groupBy })
    ],
  )
