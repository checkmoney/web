import React from 'react';

import { Button, ButtonType } from '&front/ui/components/form/button';
import { useBoundRouter } from '&front/app/router/router.utils';
import { Route } from '&front/app/router/router.types';

import * as styles from './FullHistoryButton.css';

export const FullHistoryButton = () => {
  const { pushRoute } = useBoundRouter(Route.History);

  return (
    <Button
      className={styles.button}
      onClick={pushRoute}
      type={ButtonType.Text}
    >
      Полная история
    </Button>
  );
};
