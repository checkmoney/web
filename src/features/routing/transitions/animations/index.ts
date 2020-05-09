import backwards from './backwards.css';
import forwards from './forwards.css';

export const routeAnimations = [
  {
    prevRoute: '/app',
    nextRoute: '/app/(.+)',
    styles: forwards,
  },
  {
    prevRoute: '/app/(.+)',
    nextRoute: '/app',
    styles: backwards,
  },
  {
    prevRoute: '/app/stats',
    nextRoute: '/app/stats/(.+)',
    styles: forwards,
  },
  {
    prevRoute: '/app/stats/(.+)',
    nextRoute: '/app/stats',
    styles: backwards,
  },
];
