import React, { useCallback } from 'react';
import { GoogleLogin } from 'react-google-login';

import { useNotifyAlert } from '&front/ui/hooks/useNotifyAlert';
import { GoogleProfile } from '&shared/models/user/external/GoogleProfile';
import { config } from '&front/app/config';

const { googleClientId } = config;

interface Props {
  onLogin: (profile: GoogleProfile) => any;
}

export const Google = ({ onLogin }: Props) => {
  const showNotify = useNotifyAlert();

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
    () => showNotify('Что-то пошло не так, попробуйте еще раз'),
    [showNotify],
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
