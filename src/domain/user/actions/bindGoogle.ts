import { fetchOrFail } from '&front/domain/store';
import { GoogleProfile } from '&front/models/user/external/GoogleProfile';

export const bindGoogle = (profile: GoogleProfile) =>
  fetchOrFail(undefined, async (_, getApi) => {
    await getApi().client.post('/user/bind/google', profile);
  });
