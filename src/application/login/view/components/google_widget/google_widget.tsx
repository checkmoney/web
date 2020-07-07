import { GoogleLogin, GoogleLoginResponse } from 'react-google-login';
import React, { useCallback, ComponentType } from 'react';
import { useStore } from 'effector-react';

import { errorHappened } from '&front/application/notify';
import { $config } from '&front/application/config';

import { GoogleProfile } from '../../../domain/google/google_profile';
import { GoogleWidgetProps } from './google_widget.types';

export const GoogleWidget: ComponentType<GoogleWidgetProps> = ({
  handleLogin,
  onSuccess,
  onError,
}) => {
  const handleSuccess = useCallback(
    (googleUser: GoogleLoginResponse) => {
      const rawProfile = googleUser.getBasicProfile();

      const profile: GoogleProfile = {
        id: rawProfile.getId(),
        name: rawProfile.getName(),
        photo: rawProfile.getImageUrl(),
        email: rawProfile.getEmail(),
        token: googleUser.getAuthResponse().id_token,
      };

      handleLogin(profile);

      if (onSuccess) {
        onSuccess();
      }
    },
    [handleLogin, onSuccess],
  );

  const handleError = useCallback(
    ({ details }) => {
      errorHappened(details);

      if (onError) {
        onError(details);
      }
    },
    [onError],
  );

  const { googleClientId } = useStore($config);

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
