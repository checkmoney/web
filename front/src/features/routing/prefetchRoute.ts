import NextRoutes from '../../../routes'

export const prefetchRoute = async (route: string): Promise<void> =>
  NextRoutes.Router.prefetchRoute(route)
