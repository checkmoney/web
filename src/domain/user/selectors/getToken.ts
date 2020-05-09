import { State } from '&front/domain/store';

export const getToken = (state: State) => state.user.data.token;

export const getTokenValue = (state: State) => {
  const token = getToken(state);

  if (token.nonEmpty()) {
    return token.get();
  }

  return null;
};
