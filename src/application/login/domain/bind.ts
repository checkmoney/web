import { attach } from 'effector';

import { requestFx, Method } from '&front/application/api';

const bindGoogleFx = attach({
  effect: requestFx,
  mapParams: (profile: any) => ({
    path: '/user/bind/google',
    method: Method.Post,
    body: profile,
  }),
});

export { bindGoogleFx };
