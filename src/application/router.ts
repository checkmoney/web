import createRouter from 'router5';
import browserPlugin from 'router5-plugin-browser';

enum Route {
  Login = '/',
  Dashboard = '/app',
  Hello = '/hello',
  History = '/app/history',
  Profile = '/app/profile',
  Statistics = '/app/stats',
  DetailedStatistics = '/app/stats/:type/:group',
}

const routes = [
  { name: Route.Login, path: '/' },
  { name: Route.Dashboard, path: '/app' },
  { name: Route.Hello, path: '/hello' },
  { name: Route.History, path: '/app/history' },
  { name: Route.Profile, path: '/app/profile' },
  { name: Route.Statistics, path: '/app/stats' },
  { name: Route.DetailedStatistics, path: '/app/stats/:type/:group' },
];

const router = createRouter(routes);

router.usePlugin(browserPlugin());

router.start();

export { router, Route };
