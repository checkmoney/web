import { useContext } from 'react'
import { ModalContext } from './ModalContext'

export const useModalState = (key: string) => {
  const { openKeys } = useContext(ModalContext)

  return openKeys.includes(key)
}
