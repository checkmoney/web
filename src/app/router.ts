import createRouter from 'router5';
import browserPlugin from 'router5-plugin-browser';

export enum Route {
  Login = '/',
  Dashboard = '/app',
  Hello = '/hello',
  History = '/app/history',
  Profile = '/app/profile',
  Statistics = '/app/stats',
  DetailedStatistics = '/app/stats/:type/:group',
  Manager = '/manager',
}

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
