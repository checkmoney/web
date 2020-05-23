import React, { useCallback } from 'react';

import { useThunk } from '&front/domain/store';
import { signInGoogle } from '&front/domain/user/actions/signInGoogle';
import { Google } from '&front/ui/auth-widget/google';
import { GoogleProfile } from '&shared/models/user/external/GoogleProfile';
import { useBoundRouter } from '&front/app/router/router.utils';
import { Route } from '&front/app/router/router.types';

interface Props {
  className: string;
}

export const Social = ({ className }: Props) => {
  const dispatch = useThunk();
  const { pushRoute } = useBoundRouter(Route.Dashboard);

  const handleGoogle = useCallback(async (profile: GoogleProfile) => {
    await dispatch(signInGoogle(profile));
    pushRoute();
  }, []);

  return (
    <section className={className}>
      <Google onLogin={handleGoogle} />
    </section>
  );
};
