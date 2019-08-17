import React, { useCallback } from 'react';

import { useThunk } from '&front/domain/store';
import { signInGoogle } from '&front/domain/user/actions/signInGoogle';
import { pushRoute } from '&front/features/routing';
import { Google } from '&front/ui/auth-widget/google';
import { GoogleProfile } from '&shared/models/user/external/GoogleProfile';

interface Props {
  className: string;
}

export const Social = ({ className }: Props) => {
  const dispatch = useThunk();

  const handleGoogle = useCallback(async (profile: GoogleProfile) => {
    await dispatch(signInGoogle(profile));
    await pushRoute('/app');
  }, []);

  return (
    <section className={className}>
      <Google onLogin={handleGoogle} />
    </section>
  );
};
