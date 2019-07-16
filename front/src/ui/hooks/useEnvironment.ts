import { useState, useEffect } from 'react'

export const useEnvironment = () => {
  const [dom, setDom] = useState(false)

  useEffect(() => {
    const canUseDOM = !!(
      typeof window !== 'undefined' &&
      window.document &&
      window.document.createElement
    )

    setDom(canUseDOM)
  }, [setDom])

  return {
    isServer: !dom,
    isClient: !!dom,
  }
}
