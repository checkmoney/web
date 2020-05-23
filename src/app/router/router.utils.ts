import { useCallback } from 'react';

import { Route } from './router.types';
import { router } from './router';

export const useBoundRouter = (route: Route) => {
  const pushRoute = useCallback(
    (params: Record<string, any> = {}) => {
      router.navigate(route, params);
    },
    [route],
  );

  return { pushRoute };
};

export const useRouter = () => {
  const pushRoute = useCallback(
    (route: Route, params: Record<string, any> = {}) => {
      router.navigate(route, params);
    },
    [],
  );

  return { pushRoute };
};
