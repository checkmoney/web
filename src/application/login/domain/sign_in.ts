import { attach } from 'effector';

import { requestFx, Method } from '&front/application/api';
import { router, Route } from '&front/application/router';
import { tokenChanged } from '&front/application/viewer';

import { GoogleProfile } from './google/google_profile';

interface TokenReponse {
  readonly token: string;
}

const handleSignIn = (route: Route = Route.Dashboard) => ({
  token,
}: TokenReponse) => {
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
signInByPasswordFx.doneData.watch(handleSignIn());

const signUpFx = attach({
  effect: requestFx,
  mapParams: (creds: PasswordCredentials) => ({
    path: 'user/auth/sign-up',
    method: Method.Post,
    body: creds,
  }),
});
signUpFx.doneData.watch(handleSignIn(Route.Hello));

const signInByGoogleFx = attach({
  effect: requestFx,
  mapParams: (profile: GoogleProfile) => ({
    path: 'user/auth/google',
    method: Method.Post,
    body: profile,
  }),
});
signInByGoogleFx.doneData.watch(handleSignIn());

export { signInByPasswordFx, signInByGoogleFx, signUpFx };
