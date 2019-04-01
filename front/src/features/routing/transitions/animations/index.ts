import backwards from './backwards.css'
import forwards from './forwards.css'

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
]
