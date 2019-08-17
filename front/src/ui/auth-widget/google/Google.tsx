import Head from 'next/head';
import React, { useEffect, useState } from 'react';

import { GoogleProfile } from '&shared/models/user/external/GoogleProfile';

const googleClientId = '619616345812-bi543g7ojta4uqq4kk1ccp428pik8hp8';

interface Props {
  onLogin: (profile: GoogleProfile) => any;
}

export const Google = ({ onLogin }: Props) => {
  const [isClient, setClient] = useState(false);

  useEffect(() => {
    (window as any).onSignIn = (googleUser: any) => {
      const rawProfile = googleUser.getBasicProfile();

      const profile: GoogleProfile = {
        id: rawProfile.getId(),
        name: rawProfile.getName(),
        photo: rawProfile.getImageUrl(),
        email: rawProfile.getEmail(),
        token: googleUser.getAuthResponse().id_token,
      };

      onLogin(profile);
    };

    setClient(true);
  }, []);

  return (
    <>
      <Head>
        <script
          src="https://apis.google.com/js/platform.js"
          async
          defer
        ></script>
        <meta
          name="google-signin-client_id"
          content={`${googleClientId}.apps.googleusercontent.com`}
        ></meta>
      </Head>

      {isClient && <div className="g-signin2" data-onsuccess="onSignIn" />}
    </>
  );
};
