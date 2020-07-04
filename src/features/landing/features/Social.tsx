import React, { useCallback } from 'react';

import { Google } from '&front/ui/auth-widget/google';
import { GoogleProfile, signInByGoogleFx } from '&front/application/login';

interface Props {
  className: string;
}

export const Social = ({ className }: Props) => {
  const handleGoogle = useCallback(async (profile: GoogleProfile) => {
    await signInByGoogleFx(profile);
  }, []);

  return (
    <section className={className}>
      <Google onLogin={handleGoogle} />
    </section>
  );
};
