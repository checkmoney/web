import { drop } from 'lodash'
import { ClearAction, createClearRedux } from 'redux-clear'

import { omitFirst } from '@front/helpers/omitFirst'
import { GroupBy } from '@shared/enum/GroupBy'
import { HistoryGroupModel } from '@shared/models/money/HistoryGroupModel'

import { createHistoryKey } from '../helpers/createHistoryKey'

interface CachedPeriod {
  groupBy: GroupBy
  from: Date
  to: Date
}

interface Data {
  [key: string]: HistoryGroupModel[]
}

interface State {
  data: Data
  cachedPeriods: CachedPeriod[]
}

interface Actions {
  addHistory: ClearAction<[CachedPeriod, HistoryGroupModel[]]>
}

const MAX_HISTORY_LENGTH = 10

const { actions, reducer } = createClearRedux<State, Actions>(
  {
    addHistory: ({ data, cachedPeriods, ...state }) => (period, newHistory) => {
      const { from, to, groupBy } = period
      const key = createHistoryKey(from, to, groupBy)

      const dataCount = Object.keys(data).length
      const cachedPeriodsCount = cachedPeriods.length

      const oldData = dataCount >= MAX_HISTORY_LENGTH ? omitFirst(data) : data

      const oldPeriods =
        cachedPeriodsCount >= MAX_HISTORY_LENGTH
          ? drop(cachedPeriods)
          : cachedPeriods

      // TODO: filter non-uniq cachedPeriods
      return {
        ...state,
        data: {
          ...oldData,
          [key]: newHistory,
        },
        cachedPeriods: [...oldPeriods, period],
      }
    },
  },
  {
    data: {},
    cachedPeriods: [],
  },
)

export { State, actions, reducer }
