import NextRoutes from '../routes'

export const pushRoute = async (route: string): Promise<void> =>
  NextRoutes.Router.pushRoute(route)
