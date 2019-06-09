import { useEffect } from 'react'

import { prefetchRoute } from './prefetchRoute'

export const useRoutePrefetching = (paths: string[]) => {
  useEffect(() => {
    paths.forEach(prefetchRoute)
  }, [paths])
}
