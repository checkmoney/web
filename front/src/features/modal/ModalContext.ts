import { createContext } from 'react'

interface ModalContextValue {
  openKeys: string[]
  open: (key: string) => void
  close: (key: string) => void
}

export const ModalContext = createContext<ModalContextValue>({
  openKeys: [],
  open: () => null,
  close: () => null,
})
