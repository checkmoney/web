import { createClearRedux } from 'redux-clear'
import { Option } from 'tsoption'

import { FethcingActions } from './FetchingActions'
import { FetchingState } from './FetchingState'

export const createFetchingStore = (key: string) =>
  createClearRedux<FetchingState, FethcingActions>(
    {
      request: () => () => ({
        loading: true,
        error: Option.of(null),
      }),
      failure: () => error => ({
        loading: false,
        error: Option.of(error),
      }),
      success: () => () => ({
        loading: false,
        error: Option.of(null),
      }),
    },
    {
      loading: false,
      error: Option.of(null),
    },
    key,
  )
