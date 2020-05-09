import { State } from '&front/domain/store';

export const getProfile = (state: State) => state.user.profile.data;
