import { useCallback, useContext } from 'react'

import { updateRoute } from './helpers/updateRoute'
import { MODAL_QUERY_PREFIX } from './helpers/MODAL_QUERY_PREFIX'
import { ModalContext } from './ModalContext'

export const useModalActions = (key: string) => {
  const { pushRoute } = useContext(ModalContext)

  const open = useCallback(async () => {
    await updateRoute(pushRoute, `${MODAL_QUERY_PREFIX}${key}`, 'open')
  }, [])

  const close = useCallback(async () => {
    await updateRoute(pushRoute, `${MODAL_QUERY_PREFIX}${key}`)
  }, [])

  return {
    open,
    close,
  }
}
