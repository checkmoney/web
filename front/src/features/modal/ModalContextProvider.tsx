import { ReactNode, useState, useCallback } from 'react'
import { uniq } from 'lodash'

import { ModalContext } from './ModalContext'

interface Props {
  children: ReactNode
}

export const ModalContextProvider = ({ children }: Props) => {
  const [keys, setKeys] = useState<string[]>([])

  const open = useCallback((key: string) => {
    setKeys(prevKeys => uniq([...prevKeys, key]))
  }, [])

  const close = useCallback((key: string) => {
    setKeys(prevKeys => prevKeys.filter(prevKey => prevKey !== key))
  }, [])

  // TODO: add working with routes

  return (
    <ModalContext.Provider
      value={{
        openKeys: keys,
        open,
        close,
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}
