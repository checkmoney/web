import { Option } from 'tsoption'

import { State } from '@front/domain/store/State'
import { Currency } from '@shared/enum/Currency'
import { GroupBy } from '@shared/enum/GroupBy'
import { createStatsKey } from '../helpers/createStatsKey'

export const getStats = (
  from: Date,
  to: Date,
  groupBy: GroupBy,
  currency: Currency,
) => (state: State) =>
  Option.of(state.money.stats.data[createStatsKey(from, to, groupBy, currency)])
