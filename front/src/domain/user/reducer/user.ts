import { ClearAction, createClearRedux } from 'redux-clear'
import { Currency } from '@shared/enum/Currency'

interface State {
  currency: Currency
}

interface Actions {
  setCurrency: ClearAction<[Currency]>
}

const { reducer, actions } = createClearRedux<State, Actions>(
  {
    setCurrency: state => currency => ({
      ...state,
      currency,
    }),
  },
  {
    currency: Currency.USD,
  },
  'user-data',
)

export { reducer, actions, State }
