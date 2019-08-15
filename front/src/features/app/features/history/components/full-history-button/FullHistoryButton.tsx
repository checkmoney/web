import React from 'react';

import { Button, ButtonType } from '&front/ui/components/form/button';
import { pushRoute } from '&front/features/routing';
import { useTranslation } from '&front/domain/i18n';

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
