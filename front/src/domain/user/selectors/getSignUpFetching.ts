import { State } from '&front/domain/store';

export const getSignUpFetching = (state: State) => state.user.signUp;
