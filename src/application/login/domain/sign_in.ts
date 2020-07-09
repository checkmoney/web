import { attach } from 'effector';
import { AxiosResponse } from 'axios';

import { requestFx, Method } from '&front/application/api';
import { router, Route } from '&front/application/router';
import { tokenChanged } from '&front/application/viewer';

import { GoogleProfile } from './google/google_profile';

interface TokenReponse {
  readonly token: string;
}

const handleSignIn = (token: string, route: Route = Route.Dashboard) => {
  tokenChanged(token);
  router.navigate(route);
};

interface PasswordCredentials {
  email: string;
  password: string;
}

const signInByPasswordFx = attach({
  effect: requestFx,
  mapParams: (creds: PasswordCredentials) => ({
    path: '/user/auth/sign-in',
    method: Method.Post,
    body: creds,
  }),
});
signInByPasswordFx.doneData.watch(({ data }: AxiosResponse<TokenReponse>) =>
  handleSignIn(data.token),
);

const signUpPasswordFx = attach({
  effect: requestFx,
  mapParams: (creds: PasswordCredentials) => ({
    path: 'user/auth/sign-up',
    method: Method.Post,
    body: creds,
  }),
});
signUpPasswordFx.doneData.watch(({ data }: AxiosResponse<TokenReponse>) =>
  handleSignIn(data.token, Route.Hello),
);

const signInByGoogleFx = attach({
  effect: requestFx,
  mapParams: (profile: GoogleProfile) => ({
    path: 'user/auth/google',
    method: Method.Post,
    body: profile,
  }),
});
signInByGoogleFx.doneData.watch(({ data }: AxiosResponse<TokenReponse>) =>
  handleSignIn(data.token),
);

export { signInByPasswordFx, signInByGoogleFx, signUpPasswordFx };
