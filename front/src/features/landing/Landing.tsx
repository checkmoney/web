import React from 'react';

import { useRoutePrefetching } from '../routing';
import { ForbiddenMessage } from './components/fornidden-message';
import { HelloMessage } from './components/hello-message';
import { SignIn } from './features/sign-in';
import { SignUp } from './features/sign-up';
import * as styles from './Landing.css';

interface Props {
  forbidden?: boolean;
}

export const Landing = ({ forbidden = false }: Props) => {
  useRoutePrefetching(['/hello', '/app']);

  return (
    <section className={styles.container}>
      {forbidden ? (
        <ForbiddenMessage className={styles.message} />
      ) : (
        <HelloMessage className={styles.message} />
      )}
      <SignIn className={styles.signIn} />
      <SignUp className={styles.signUp} />
    </section>
  );
};
