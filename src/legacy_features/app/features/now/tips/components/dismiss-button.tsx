import React, { useCallback } from 'react';

import { Button } from '&front/presentation/atoms';
import { disableTipFx } from '&front/application/tips';

interface Props {
  token: string;
}

export const DismissButton = ({ token }: Props) => {
  const onDismiss = useCallback(() => disableTipFx(token), [token]);

  return (
    <Button mod="ghost" onClick={onDismiss}>
      Закрыть
    </Button>
  );
};
