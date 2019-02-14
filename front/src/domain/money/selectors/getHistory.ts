import { Option } from 'tsoption'

import { State } from '@front/domain/store/State'
import { GroupBy } from '@shared/enum/GroupBy'

import { createHistoryKey } from '../helpers/createHistoryKey'

export const getHistory = (from: Date, to: Date, groupBy: GroupBy) => (
  state: State,
) => Option.of(state.money.history[createHistoryKey(from, to, groupBy)])
