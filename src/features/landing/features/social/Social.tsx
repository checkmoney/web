import React, { useCallback } from 'react';
import { useRouter } from 'react-router5';

import { useThunk } from '&front/domain/store';
import { signInGoogle } from '&front/domain/user/actions/signInGoogle';
import { Google } from '&front/ui/auth-widget/google';
import { GoogleProfile } from '&shared/models/user/external/GoogleProfile';
import { Route } from '&front/app/router';

interface Props {
  className: string;
}

export const Social = ({ className }: Props) => {
  const dispatch = useThunk();
  const { navigate } = useRouter();

  const handleGoogle = useCallback(async (profile: GoogleProfile) => {
    await dispatch(signInGoogle(profile));
    navigate(Route.Dashboard);
  }, []);

  return (
    <section className={className}>
      <Google onLogin={handleGoogle} />
    </section>
  );
};
