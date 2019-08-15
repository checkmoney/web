import React, { useCallback } from 'react';

import { useTranslation } from '&front/domain/i18n';
import { disableTips } from '&front/domain/mind/actions/disableTips';
import { useThunk } from '&front/domain/store';
import { Button, ButtonType } from '&front/ui/components/form/button';

interface Props {
  token: string;
}

export const DismissButton = ({ token }: Props) => {
  const dispatch = useThunk();
  const { t } = useTranslation();

  const onDismiss = useCallback(() => dispatch(disableTips([token])), [token]);

  return (
    <Button type={ButtonType.Text} onClick={onDismiss}>
      {t('tips:dismiss')}
    </Button>
  );
};
