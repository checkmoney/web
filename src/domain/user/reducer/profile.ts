import {
  ClearAction,
  createClearReduxWithFetching,
  WithFetchingState,
} from 'redux-clear';

import { Currency } from '&shared/enum/Currency';
import { ProfileModel } from '&shared/models/user/ProfileModel';

type InternalState = ProfileModel;
type State = WithFetchingState<InternalState>;
interface Actions {
  setProfile: ClearAction<[ProfileModel]>;
}

const { reducer, actions } = createClearReduxWithFetching<
  InternalState,
  Actions
>(
  {
    setProfile: () => profile => profile,
  },
  {
    defaultCurrency: Currency.USD,
    weekStartsOnMonday: true,
  },
  'profile',
);

export { State, reducer, actions };
