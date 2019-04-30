import { pushRoute } from '@front/features/routing'

import { getNewPathname } from './getNewPathname'

export const updateRoute = (keyName: string, keyValue?: string) => {
  const { pathname, search } = window.location
  const newPathname = getNewPathname(search, keyName, keyValue, pathname)

  return pushRoute(newPathname)
}
