import React from 'react';
import { useRouter } from 'react-router5';

import { Button, ButtonType } from '&front/ui/components/form/button';
import { Route } from '&front/app/router';

import * as styles from './FullHistoryButton.css';

export const FullHistoryButton = () => {
  const { navigate } = useRouter();

  return (
    <Button
      className={styles.button}
      onClick={() => navigate(Route.History)}
      type={ButtonType.Text}
    >
      Полная история
    </Button>
  );
};
