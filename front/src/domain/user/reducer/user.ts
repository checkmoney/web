import {
  ClearAction,
  createClearReduxWithFetching,
  FetchingState,
} from 'redux-clear'
import { Currency } from '@shared/enum/Currency'
interface State extends FetchingState {
  defaultCurrency: Currency
}

interface Actions {
  setCurrency: ClearAction<[Currency]>
}

const { reducer, actions } = createClearReduxWithFetching<State, Actions>(
  {
    setCurrency: state => currency => ({
      ...state,
      currency,
    }),
  },
  {
    defaultCurrency: Currency.USD,
    error: Error as any,
    loading: false,
  },
  'user-data',
)

export { reducer, actions, State }
