import { useCallback } from 'react'

import { updateRoute } from './helpers/updateRoute'
import { MODAL_QUERY_PREFIX } from './helpers/MODAL_QUERY_PREFIX'

export const useModalActions = (key: string) => {
  const open = useCallback(async () => {
    await updateRoute(`${MODAL_QUERY_PREFIX}${key}`, 'open')
  }, [])

  const close = useCallback(async () => {
    updateRoute(`${MODAL_QUERY_PREFIX}${key}`)
  }, [])

  return {
    open,
    close,
  }
}
