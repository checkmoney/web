import { Option } from 'tsoption'

import NextRoutes from '../routes'
import { AppContext } from './domain/AppContext'

const redirectOnServer = (route: string, context: AppContext) => {
  context.res.writeHead(302, { Location: route })
  context.res.end()
}

export const pushRoute = async (
  route: string,
  context: Option<AppContext> = Option.of(null),
): Promise<void> => {
  if (context.nonEmpty()) {
    return redirectOnServer(route, context.get())
  }

  return NextRoutes.Router.pushRoute(route)
}
