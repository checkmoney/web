import { createContext } from 'react'

interface ModalContextValue {
  openKeys: Set<string>
  open: (key: string) => void
  close: (key: string) => void
}

export const ModalContext = createContext<ModalContextValue>({
  openKeys: new Set(),
  open: () => null,
  close: () => null,
})
