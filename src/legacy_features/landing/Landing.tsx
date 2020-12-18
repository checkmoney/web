import React from 'react';

import { SignIn } from './features/SignIn';
import { SignUp } from './features/SignUp';
import { Social } from './features/Social';
import * as styles from './Landing.css';

export const Landing = () => {
  return (
    <section className={styles.container}>
      <p className={styles.message}>Привет! 💸</p>
      <p className={styles.message}>Это трекер доходов и расходов</p>
      <SignIn className={styles.signIn} />
      <SignUp className={styles.signUp} />
      <Social className={styles.social} />
    </section>
  );
};
