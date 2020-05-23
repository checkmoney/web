import { useDispatch } from 'redux-react-hook';
import { useCallback } from 'react';

import { Route } from './router.types';
import { routerActions } from './router.actions';

export const useBoundRouterActions = (route: Route) => {
  const dispatch = useDispatch();

  const pushRoute = useCallback(
    (params?: object) => {
      dispatch(routerActions.push({ route, params }));
    },
    [route],
  );

  return { pushRoute };
};

export const useRouterActions = () => {
  const dispatch = useDispatch();

  const pushRoute = useCallback((route: Route, params?: object) => {
    dispatch(routerActions.push({ route, params }));
  }, []);

  return { pushRoute };
};
