import { createSelector } from 'reselect';

import { getDecodedToken } from './getDecodedToken';

export const getUserIsManager = createSelector(
  getDecodedToken,
  tokenPayload =>
    tokenPayload.map(payload => !!payload.isManager).getOrElse(false),
);
