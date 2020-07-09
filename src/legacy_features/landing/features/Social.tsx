import React from 'react';

import { signInByGoogleFx, GoogleWidget } from '&front/application/login';

interface Props {
  className: string;
}

export const Social = ({ className }: Props) => {
  return (
    <section className={className}>
      <GoogleWidget handleLogin={signInByGoogleFx} />
    </section>
  );
};
