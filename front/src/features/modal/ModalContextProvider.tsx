import { ReactNode, useState, useCallback } from 'react'
import qs from 'qs'

import { ModalContext } from './ModalContext'
import { useEffect } from 'react'
import { getModalKeys } from './helpers/getModalKeys'
import { updateRoute } from './helpers/updateRoute'
import { MODAL_QUERY_PREFIX } from './helpers/MODAL_QUERY_PREFIX'

interface Props {
  children: ReactNode
  initialQuery: any
}

export const ModalContextProvider = ({ children, initialQuery }: Props) => {
  const [keys, setKeys] = useState(getModalKeys(initialQuery))

  const open = useCallback(async (key: string) => {
    await updateRoute(`${MODAL_QUERY_PREFIX}${key}`, 'open')
  }, [])

  const close = useCallback(async (key: string) => {
    updateRoute(`${MODAL_QUERY_PREFIX}${key}`)
  }, [])

  const onRouteChangeStart = useCallback(
    ({ url }: { url: string }) => {
      const [, queryString] = url.split('?')
      const parsedQuery = qs.parse(queryString)
      const newKeys = getModalKeys(parsedQuery)
      setKeys(newKeys)
    },
    [setKeys],
  )

  useEffect(() => {
    const _wr = function(type: string) {
      const orig = (history as any)[type]
      return function(...args: any[]) {
        const rv = orig.apply(this, args)
        const e: any = new Event('routeChanges')
        e.url = window.location.href
          .replace(window.location.host, '')
          .replace(`${window.location.protocol}//`, '')
        window.dispatchEvent(e)
        return rv
      }
    }
    history.pushState = _wr('pushState')
    history.replaceState = _wr('replaceState')

    window.addEventListener('routeChanges', onRouteChangeStart as any)

    return () => {
      window.removeEventListener('routeChanges', onRouteChangeStart as any)
    }
  }, [onRouteChangeStart])

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
