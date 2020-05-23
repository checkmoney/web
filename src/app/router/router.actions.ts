import actionCreatorFactory from 'typescript-fsa';

import { Route } from './router.types';

const actionCreator = actionCreatorFactory('ROUTER');

export const routerActions = {
  push: actionCreator<{ route: Route; params?: object }>('PUSH'),
};
