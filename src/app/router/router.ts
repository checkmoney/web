import createRouter from 'router5';
import browserPlugin from 'router5-plugin-browser';

import { Route } from './router.types';

const routes = [
  { name: Route.Login, path: '/' },
  { name: Route.Dashboard, path: '/app' },
  { name: Route.Hello, path: '/hello' },
  { name: Route.History, path: '/app/history' },
  { name: Route.Profile, path: '/app/profile' },
  { name: Route.Statistics, path: '/app/stats' },
  { name: Route.DetailedStatistics, path: '/app/stats/:type/:group' },
  { name: Route.Manager, path: '/manager' },
];

const router = createRouter(routes);

router.usePlugin(browserPlugin({ useHash: true }));

router.start();

export { router };
