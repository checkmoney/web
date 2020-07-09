import React from 'react';
import { useRouter } from 'react-router5';

import { Button } from '&front/presentation/atoms';
import { Route } from '&front/application/router';

export const FullHistoryButton = () => {
  const { navigate } = useRouter();

  return (
    <Button onClick={() => navigate(Route.History)} mod={'link'}>
      Полная история
    </Button>
  );
};
