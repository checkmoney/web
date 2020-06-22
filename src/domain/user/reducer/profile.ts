import {
  ClearAction,
  createClearReduxWithFetching,
  WithFetchingState,
} from 'redux-clear';

import { Currency } from '&front/enum/Currency';
import { ProfileModel } from '&front/models/user/ProfileModel';

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
    setProfile: () => (profile) => profile,
  },
  {
    defaultCurrency: Currency.USD,
    weekStartsOnMonday: true,
  },
  'profile',
);

export { State, reducer, actions };
