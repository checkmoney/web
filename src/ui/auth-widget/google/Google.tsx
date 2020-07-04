import React, { useCallback } from 'react';
import { GoogleLogin } from 'react-google-login';

import { config } from '&front/app/config';
import { GoogleProfile } from '&front/application/login';
import { somethingHappened } from '&front/application/notify';

const googleClientId = config('GOOGLE_CLIENT_ID');

interface Props {
  onLogin: (profile: GoogleProfile) => any;
}

export const Google = ({ onLogin }: Props) => {
  const handleSuccess = useCallback(
    (googleUser: any) => {
      const rawProfile = googleUser.getBasicProfile();

      const profile: GoogleProfile = {
        id: rawProfile.getId(),
        name: rawProfile.getName(),
        photo: rawProfile.getImageUrl(),
        email: rawProfile.getEmail(),
        token: googleUser.getAuthResponse().id_token,
      };

      onLogin(profile);
    },
    [onLogin],
  );

  const handleError = useCallback(
    () => somethingHappened('Что-то пошло не так, попробуйте еще раз'),
    [],
  );

  return (
    <GoogleLogin
      clientId={googleClientId}
      buttonText="Login"
      onSuccess={handleSuccess}
      onFailure={handleError}
      cookiePolicy={'single_host_origin'}
    />
  );
};
