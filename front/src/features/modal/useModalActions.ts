import { useContext } from 'react'
import { ModalContext } from './ModalContext'

export const useModalActions = (key: string) => {
  const { open, close } = useContext(ModalContext)

  return {
    open: () => open(key),
    close: () => close(key),
  }
}
