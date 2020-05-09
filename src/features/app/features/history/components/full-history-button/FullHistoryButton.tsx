import React from 'react';

import { useTranslation } from '&front/domain/i18n';
import { pushRoute } from '&front/features/routing';
import { Button, ButtonType } from '&front/ui/components/form/button';

import * as styles from './FullHistoryButton.css';

export const FullHistoryButton = () => {
  const { t } = useTranslation();

  return (
    <Button
      className={styles.button}
      onClick={() => pushRoute('/app/history')}
      type={ButtonType.Text}
    >
      {t('short-history:action')}
    </Button>
  );
};
