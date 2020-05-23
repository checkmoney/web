import { fetchOrFail } from '&front/domain/store';
import { eraseToken } from '&front/app/auth/auth.utils';

export const signOut = () =>
  fetchOrFail(undefined, async (_) => {
    eraseToken();
  });
