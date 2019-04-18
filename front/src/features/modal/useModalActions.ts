import { useContext } from 'react'
import { useMemo } from 'react'
import { ModalContext } from './ModalContext'

export const useModalActions = (key: string) => {
  const { open, close } = useContext(ModalContext)

  return useMemo(() => {
    return {
      open: () => open(key),
      close: () => close(key),
    }
  }, [open, close, key])
}
